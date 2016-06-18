import bcrypt from 'bcrypt'

/**
 * Gets the bcrypt hash of a value.
 * @param {string} value - The value to hash
 * @return {promise} A promise resolving with the hash
 */
export function bcryptHash (value, options = {}) {
  if (!value || typeof value !== 'string') {
    throw new TypeError(`expected string, got ${typeof value}`)
  }

  return new Promise((resolve, reject) => {
    bcrypt.genSalt(options.saltRounds || 10, (err, salt) => {
      if (err) return reject(err)

      bcrypt.hash(value, salt, (err, hash) => {
        if (err) reject(err)
        else resolve(hash)
      })
    })
  })
}

/**
 * Checks if a value is valid compared to a bcrypt hash.
 * @param {string} value - The value to compare
 * @param {string} hash - The bcrypted hash
 * @return {promise} A promise resolving with a boolean
 */
export function bcryptCompare (value, hash = '') {
  if (!value || typeof value !== 'string') {
    throw new TypeError(`expected string, got ${typeof value}`)
  }

  return new Promise((resolve, reject) => {
    bcrypt.compare(value, hash, (err, res) => {
      if (err) reject(err)
      else resolve(Boolean(res))
    })
  })
}
