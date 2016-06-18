import crypto from 'crypto'
import { parseObject, stringify } from './utils'

module.exports = {
  encrypt,
  decrypt,
  generateKey,
}

const ALGORITHM = 'aes-256-ctr'
const HMAC_ALGORITHM = 'sha256'

/**
 * Encrypts a value using ciphers.
 * @param {string} value - The value to encrypt
 * @param {string} key - The secret encryption key
 * @return {string} The encrypted value
 */
export function encrypt (value, key) {
  key = new Buffer(getEncryptionKey(key))

  const iv = new Buffer(crypto.randomBytes(16))

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
  cipher.setEncoding('hex')
  cipher.write(stringify(value))
  cipher.end()

  const cipherText = cipher.read()

  const hmac = crypto.createHmac(HMAC_ALGORITHM, key)
  hmac.update(cipherText)
  hmac.update(iv.toString('hex'))

  return `${cipherText}$${iv.toString('hex')}$${hmac.digest('hex')}`
}

/**
 * Decrypts a value using ciphers.
 * @param {string} value - The encrypted string to decrypt
 * @param {string} key - The secret encryption key
 */
export function decrypt (value, key) {
  if (typeof value !== 'string') {
    throw new TypeError(`expected a string, got ${typeof value}`)
  }

  key = new Buffer(getEncryptionKey(key))

  const cipher = value.split('$')
  const iv = new Buffer(cipher[1], 'hex')

  const hmac = crypto.createHmac(HMAC_ALGORITHM, key)
  hmac.update(cipher[0])
  hmac.update(iv.toString('hex'))

  if (!constantTimeCompare(hmac.digest('hex'), cipher[2])) {
    throw new Error('encrypted payload has been tampered with')
  }

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
  const decryptedText = decipher.update(cipher[0], 'hex', 'utf-8')

  const final = decryptedText + decipher.final('utf8')

  return parseObject(final) || final
}

/**
 * Generates a secure 256-bit key.
 * @return {string} The generated key
 */
export function generateKey (length = 64) {
  length = parseInt(length, 10)

  if (length < 2 || length % 2 !== 0) {
    throw new Error('length must be an even number above 0!')
  }

  return crypto.randomBytes(length / 2).toString('hex')
}

/**
 * Ensures the encrypted payload has not been tampered with.
 * @param {string} val1 - Hash to compare
 * @param {string} val2 - Hash to compare to
 * @return {boolean} Whether it is valid
 */
function constantTimeCompare (val1, val2) {
  let sentinel

  if (val1.length !== val2.length) return false

  for (let i = 0, len = val1.length; i < len; i++) {
    sentinel |= val1.charCodeAt(i) ^ val2.charCodeAt(i)
  }

  return sentinel === 0
}

/**
 * Gets the encryption key from the environment,
 * and hash with SHA256 (ensures length). Falls back
 * to the environment variable if no key is specified.
 * @param {string} key - The key to use
 * @return {string} The encryption key
 */
function getEncryptionKey (key) {
  key = key || process.env.ENCRYPTION_KEY
  if (!key) throw new Error('encryption key not found')

  const cryptoKey = crypto.createHash('sha256').update(key).digest()
  return cryptoKey
}
