import { randomBytes } from 'crypto'

/**
 * Creates a random string.
 * @param {integer} size - The size of the returned string
 * @param {string} charset - The charset to pick characters from
 * @return {int} A random string
 */
export function randomString (size = 10, charset) {
  if (size <= 0) {
    throw new Error('random size must be above 0!')
  }

  if (typeof size !== 'number') {
    throw new TypeError(`expected number, got ${typeof size}`)
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
 * @param {object} options - The min and max values
 */
export function randomNumber (options = {}) {
  const integerLimit = 9007199254740991

  options.min = options.min || 0
  options.max = options.max || integerLimit

  if (
    options.min < 0 || options.min > integerLimit - 1 ||
    options.max < 1 || options.max > integerLimit
  ) throw new Error(`limits must be between 0 and ${integerLimit}`)

  /* work with strings instead if length is supplied */
  if (options.length) {
    return randomString(options.length, '0123456789')
  }

  return Math.floor(Math.random() * (options.max - options.min + 1) + options.min)
}
