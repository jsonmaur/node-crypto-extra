import crypto from 'crypto'
import { stringify } from './utils'

/**
 * Gets the hash a value.
 * @param {string} value - The value to hash
 * @return {string} The resulting hash
 */
export function hash (value, options = {}) {
  if (value === undefined) {
    throw new Error('cannot hash an undefined value')
  }

  value = stringify(value)

  options.algorithm = options.algorithm || 'sha256'
  options.rounds = parseInt(options.rounds, 10) || 1
  if (options.salt) value += options.salt

  let hash = value
  for (let i = 0; i < options.rounds; i++) {
    hash = crypto.createHash(options.algorithm)
      .update(hash, 'utf8').digest('hex')
  }

  return hash
}
