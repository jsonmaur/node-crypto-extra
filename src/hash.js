import crypto from 'crypto'
import fs from 'fs-promise'
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

  options.algorithm = options.algorithm || 'sha1'
  if (options.salt) value += options.salt

  const hash = crypto.createHash(options.algorithm)
  return hash.update(value, 'utf8').digest('hex')
}

/**
 * Gets the checksum of a file.
 * @param {string} file - The path of the file to hash
 * @return {promise} A promise resolving with the checksum hash
 */
export async function checksum (file, options = {}) {
  if (!await fs.exists(file)) {
    throw new Error(`${file} does not exist`)
  }

  const stream = fs.createReadStream(file)
  const hash = crypto.createHash(options.algorithm || 'sha1')

  stream.on('data', (data) => hash.update(data, 'utf8'))

  return new Promise((resolve, reject) => {
    stream.on('end', () => resolve(hash.digest('hex')))
    stream.on('error', reject)
  })
}

export function checksumSync (file, options = {}) {
  if (!fs.existsSync(file)) {
    throw new Error(`${file} does not exist`)
  }

  const contents = fs.readFileSync(file, 'utf8')
  return hash(contents, options)
}
