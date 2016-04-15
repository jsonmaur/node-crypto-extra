import { createCipher, createDecipher } from 'crypto'
import { parseObject, stringify } from './utils'

/**
 * Encrypts a value using AES-256-CTR.
 * @param {string} value - The value to encrypt
 * @param {string} key - The secret encryption key
 * @return {string} The encrypted value
 */
export function encrypt (value, key) {
  value = stringify(value)
  key = getEncryptionKey(key)

  const cipher = createCipher('aes-256-ctr', key)
  const encrypted = cipher.update(value, 'utf8', 'hex')
  const final = encrypted + cipher.final('hex')

  return final
}

/**
 * Decrypts a value using AES-256-CTR.
 * @param {string} value - The encrypted string to decrypt
 * @param {string} key - The secret encryption key
 */
export function decrypt (value, key) {
  if (typeof value !== 'string') {
    throw new TypeError(`expected a string, got ${typeof value}`)
  }

  key = getEncryptionKey(key)

  const decipher = createDecipher('aes-256-ctr', key)
  const decrypted = decipher.update(value, 'hex', 'utf8')
  const final = decrypted + decipher.final('utf8')

  return parseObject(final) || final
}

/**
 * Gets the encryption key from the environment
 * if it exists, with a fallback key.
 * @param {string} fallbackKey - The fallback key to use
 * @return {string} The encryption key
 */
export function getEncryptionKey (fallbackKey) {
  const key = process.env.ENCRYPTION_KEY || fallbackKey
  if (!key) throw new Error('encryption key not found')

  return key
}
