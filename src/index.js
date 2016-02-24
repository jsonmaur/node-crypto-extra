/**
 * dependencies
 */

require('es6-promise').polyfill() // for use of denodeify

import crypto, { randomBytes } from 'crypto'
import bcryptjs from 'bcryptjs'
import dn from 'denodeify'

/**
 * api
 */

module.exports = Object.assign(crypto, {
  encrypt, decrypt, hash, bcrypt, random
})

/**
 * encrypt a value using AES256-CTR
 * @param value (string) the string to encrypt
 * @param key (string, optional) the private key to use
 */

export function encrypt (value, key) {
  /* only allow strings and numbers */
  if (typeof value === 'number') value = String(value)
  else if (typeof value === 'object') value = JSON.stringify(value)
  else if (typeof value !== 'string') return

  key = key || process.env.ENCRYPTION_KEY
  if (!key) throw new Error('you need an encryption key!')

  let cipher = crypto.createCipher('aes-256-ctr', key)
  let encrypted = cipher.update(value, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  return encrypted
}

/**
 * decrypt a value using AES256-CTR
 * @param value (string) the encrypted string to decrypt
 * @param key (string, optional) the private key to use
 */

export function decrypt (value, key) {
  if (typeof value !== 'string') return

  key = key || process.env.ENCRYPTION_KEY

  let decipher = crypto.createDecipher('aes-256-ctr', key)
  let decrypted = decipher.update(value, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  if (decrypted.indexOf('{') === 0) {
    decrypted = JSON.parse(decrypted)
  }

  return decrypted
}

/**
 * create a hash
 * @param value (string) the value to hash
 * @param salt (string) the salt to use when hashing
 * @param algorithm (string, optional) the hashing algorithm to use
 */

export function hash (value, options = {}) {
  options.salt = options.salt || undefined
  options.algorithm = options.algorithm || 'sha256'

  if (options.salt) value += options.salt

  return crypto.createHash(options.algorithm)
    .update(value)
    .digest('hex')
}

/**
 * for hashing to bcrypt, and comparing to a hash.
 * @param value (string) the value to hash
 * @param hash (string, optional) if provided, the hash to compare
 */

export function bcrypt (value, hash) {
  if (hash) {
    return dn(bcryptjs.compare)(value, hash)
  } else {
    return dn(bcryptjs.genSalt)(10)
      .then(salt => dn(bcryptjs.hash)(value, salt))
  }
}

/**
 * creates a random hex value
 * @param size (int, optional) the size of the returned string
 */

export function random (size = 32) {
  if (size === 0) {
    throw new Error('zero-length randomHex is useless')
  }

  if (size % 2 !== 0) {
    throw new Error('randomHex size must be even')
  }

  return randomBytes(size / 2).toString('hex')
}
