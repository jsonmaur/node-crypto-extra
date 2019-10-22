import { randomBytes } from "crypto"

type RandomNumberOptions = {
	min?: number
	max?: number
}

/**
 * Creates a random string.
 */
export function randomString(size?: number, charset?: string): string {
	if (size !== undefined && size <= 0) {
		throw new Error("Random size must be a number above 0!")
	}

	const bytes = randomBytes(size || 10)
	const chars = charset || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

	let value = ""
	for (let i = 0, len = bytes.length; i < len; i++) {
		value += chars[bytes.readUInt8(i) % chars.length]
	}

	return value
}

/**
 * Generates a random number.
 */
export function randomNumber(options: RandomNumberOptions = {}): number {
	const integerLimit = Number.MAX_SAFE_INTEGER

	options.min = options.min || 0
	options.max = options.max || integerLimit

	if (
		options.min < 0 ||
		options.min > integerLimit - 1 ||
		options.max < 1 ||
		options.max > integerLimit
	) {
		throw new Error(`Limits must be between 0 and ${integerLimit}`)
	}

	const hex = randomBytes(16).toString("hex")
	const integer = parseInt(hex, 16)
	const random = integer / 0xffffffffffffffffffffffffffffffff

	return Math.floor(random * (options.max - options.min + 1) + options.min)
}

/**
 * Generates a secure 256-bit key.
 */
export function randomKey(length: number = 64): string {
	if (length < 2 || length % 2 !== 0) {
		throw new TypeError("Length must be an even number above 0")
	}

	return randomBytes(length / 2).toString("hex")
}
