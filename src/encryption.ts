import crypto from "crypto"
import { stringify } from "./utils"

const ALGORITHM = "aes-256-ctr"
const HMAC_ALGORITHM = "sha256"

/**
 * Gets the encryption key from the environment,
 * and hash with SHA256 (ensures length). Falls back
 * to the environment variable if no key is specified.
 */
function getEncryptionKey(key?: string): Buffer {
	const encryptionKey = key || process.env.ENCRYPTION_KEY

	if (!encryptionKey) {
		throw new Error("No encryption key was found")
	}

	const cryptoKey = crypto
		.createHash("sha256")
		.update(encryptionKey)
		.digest()

	return cryptoKey
}

/**
 * Ensures the encrypted payload has not been tampered with.
 */
function constantTimeCompare(val1: string, val2: string): boolean {
	if (val1.length !== val2.length) {
		return false
	}

	let sentinel = 0
	for (let i = 0, len = val1.length; i < len; i++) {
		sentinel |= val1.charCodeAt(i) ^ val2.charCodeAt(i)
	}

	return sentinel === 0
}

/**
 * Encrypts a value using ciphers.
 */
export function encrypt(value: any, key?: string): string {
	const iv = Buffer.from(crypto.randomBytes(16))
	const encryptionKey = Buffer.from(getEncryptionKey(key))
	const cipher = crypto.createCipheriv(ALGORITHM, encryptionKey, iv)

	cipher.setEncoding("hex")
	cipher.write(stringify(value))
	cipher.end()

	const cipherText = cipher.read()
	const hmac = crypto.createHmac(HMAC_ALGORITHM, encryptionKey)

	hmac.update(cipherText)
	hmac.update(iv.toString("hex"))

	return `${cipherText}$${iv.toString("hex")}$${hmac.digest("hex")}`
}

/**
 * Decrypts a value using ciphers.
 */
export function decrypt(value: string, key?: string): any {
	const cipher = value.split("$")
	const iv = Buffer.from(cipher[1], "hex")
	const encryptionKey = Buffer.from(getEncryptionKey(key))
	const hmac = crypto.createHmac(HMAC_ALGORITHM, encryptionKey)

	hmac.update(cipher[0])
	hmac.update(iv.toString("hex"))

	if (!constantTimeCompare(hmac.digest("hex"), cipher[2])) {
		throw new Error("Encrypted payload has been tampered with")
	}

	const decipher = crypto.createDecipheriv(ALGORITHM, encryptionKey, iv)
	const decryptedText = decipher.update(cipher[0], "hex")
	const final = `${decryptedText}${decipher.final()}`

	try {
		return JSON.parse(final)
	} catch (err) {
		return final
	}
}
