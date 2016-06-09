const crypto = require('crypto')
const { parseObject, stringify } = require('./utils')

module.exports = {
  encrypt,
  decrypt,
  constantTimeCompare,
  getEncryptionKey,
  generateKey,
  decryptOld,
}

const ALGORITHM = 'aes-256-ctr'
const HMAC_ALGORITHM = 'sha256'

/**
 * Encrypts a value using ciphers.
 * @param {string} value - The value to encrypt
 * @param {string} key - The secret encryption key
 * @return {string} The encrypted value
 */
function encrypt (value, key) {
  key = new Buffer(getEncryptionKey(key))

  if (key.length < 32) {
    throw new Error('secret key must be at least 32 characters!')
  }

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
function decrypt (value, key) {
  if (typeof value !== 'string') {
    throw new TypeError(`expected a string, got ${typeof value}`)
  }

  key = new Buffer(getEncryptionKey(key))
  if (key.length < 32) {
    throw new Error('secret key must be at least 32 characters!')
  }

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
 * Gets the encryption key from the environment
 * if it exists, with a fallback key.
 * @param {string} fallbackKey - The fallback key to use
 * @return {string} The encryption key
 */
function getEncryptionKey (key) {
  const encryptionKey = key || process.env.ENCRYPTION_KEY
  if (!encryptionKey) throw new Error('encryption key not found')

  return encryptionKey
}

/**
 * Generates a secure 256-bit key.
 * @return {string} The generated key
 */
function generateKey () {
  return crypto.randomBytes(32).toString('hex')
}

// -----------------------------------------------------------------------------
// deprecated
// -----------------------------------------------------------------------------

function decryptOld (value, key) {
  if (typeof value !== 'string') {
    throw new TypeError(`expected a string, got ${typeof value}`)
  }

  key = getEncryptionKey(key)

  const decipher = crypto.createDecipher('aes-256-ctr', key)
  const decrypted = decipher.update(value, 'hex', 'utf8')
  const final = decrypted + decipher.final('utf8')

  return parseObject(final) || final
}
