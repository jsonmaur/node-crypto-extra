const crypto = require('crypto')
const encryption = require('./encryption')
const hash = require('./hash')
const bcryptjs = require('./bcrypt')
const random = require('./random')

module.exports = Object.assign(crypto, {
  encrypt: encryption.encrypt,
  // decrypt: encryption.decrypt, // see deprecation method below
  generateKey: encryption.generateKey,
  hash: hash.hash,
  checksum: hash.checksum,
  checksumSync: hash.checksumSync,
  // bcrypt: bcryptjs.bcrypt, // see deprecation method below
  bcryptSync: bcryptjs.bcryptSync,
  bcryptCompare: bcryptjs.bcryptCompare,
  bcryptCompareSync: bcryptjs.bcryptCompareSync,
  randomString: random.randomString,
  // randomNumber: random.randomNumber, // see deprecation method below

  /* deprecated methods */

  decrypt (value, key) {
    /* prompt for old encrypted values (before IV implementation) */
    if (typeof value === 'string' && !value.match(/\$/)) {
      deprecationNotice(null, null, 'you are using an outdated encryption value! re-encrypt this.')
      return encryption.decryptOld(value, key)
    }

    return encryption.decrypt(value, key)
  },

  random (size) {
    deprecationNotice('random', 'randomString')
    return random.randomString(size)
  },

  randomNumber (options = {}) {
    /* no longer allow .length option */
    if (options.length) {
      deprecationNotice(null, 'randomString')
      return random.randomString(options.length, '1234567890')
    }

    return random.randomNumber(options)
  },

  bcrypt (value, options) {
    /* no longer allow combined hash/compare function */
    if (typeof options === 'string') {
      deprecationNotice(null, 'bcryptCompare')
      return bcryptjs.bcryptCompare(value, options)
    }

    return bcryptjs.bcrypt(value, options)
  },
})

function deprecationNotice (oldName, newName, msg) {
  const first = oldName ? `${oldName}() is now deprecated. ` : ''
  const second = newName ? `use ${newName}() instead.` : ''

  if (msg) console.log(`crypto-extra: ${msg}`)
  else console.log(`crypto-extra: ${first}${second}`)
}
