import { randomBytes } from 'crypto'

/**
 * Creates a random string.
 * @param {integer} size - The size of the returned string
 * @param {string} charset - The charset to pick characters from
 * @return {Promise => string} The generated string
 */
export function randomString (size = 10, charset) {
  size = typeof size !== 'number' ? size = parseInt(size, 10) : size
  if (size <= 0) throw new Error('random size must be above 0!')

  if (typeof charset !== 'string') {
    throw new TypeError(`charset must be a string, got ${typeof charset}`)
  }

  const bytes = randomBytes(size)
  const chars = charset || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let value = ''
  for (let i = 0, len = bytes.length; i < len; i++) {
    value += chars[bytes.readUInt8(i) % chars.length]
  }

  return value
}

/**
 * Generates a random number.
 * @return {number} The generated number
 */
export function randomNumber (options = {}) {
  const integerLimit = Number.MAX_SAFE_INTEGER

  options.min = options.min || 0
  options.max = options.max || integerLimit

  if (typeof options.min !== 'number' || typeof options.max !== 'number') {
    throw new TypeError('min and max have to be numbers')
  }

  if (
    options.min < 0 || options.min > integerLimit - 1 ||
    options.max < 1 || options.max > integerLimit
  ) {
    throw new Error(`limits must be between 0 and ${integerLimit}`)
  }

  const hex = randomBytes(16).toString('hex')
  const integer = parseInt(hex, 16)
  const random = integer / 0xffffffffffffffffffffffffffffffff

  return Math.floor(random * (options.max - options.min + 1) + options.min)
}
