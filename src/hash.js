const fs = require('fs')
const crypto = require('crypto')
const { stringify } = require('./utils')

module.exports = {
  hash,
  checksum,
  checksumSync,
}

/**
 * Gets the hash a value.
 * @param {string} value - The value to hash
 * @return {string} The resulting hash
 */
function hash (value, options = {}) {
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

/**
 * Gets the checksum of a file.
 * @param {string} file - The path of the file to hash
 * @return {promise} A promise resolving with the checksum hash
 */
function checksum (file, options = {}) {
  return new Promise((resolve, reject) => {
    fs.exists(file, (err, exists) => {
      if (err) throw err
      else if (!exists) throw new Error(`${file} does not exist`)

      const stream = fs.createReadStream(file)
      const hash = crypto.createHash(options.algorithm || 'sha256')

      stream.on('error', reject)
      stream.on('data', (data) => hash.update(data, 'utf8'))
      stream.on('end', () => resolve(hash.digest('hex')))
    })
  })
}

function checksumSync (file, options = {}) {
  if (!fs.existsSync(file)) {
    throw new Error(`${file} does not exist`)
  }

  const contents = fs.readFileSync(file, 'utf8')
  return hash(contents, options)
}
