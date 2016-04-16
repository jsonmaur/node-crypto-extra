import crypto from 'crypto'
import * as encryption from './encryption'
import * as hash from './hash'
import * as bcryptjs from './bcrypt'
import * as random from './random'

module.exports = Object.assign(crypto, {
  encrypt: encryption.encrypt,
  // decrypt: encryption.decrypt, // see deprecation method below
  hash: hash.hash,
  checksum: hash.checksum,
  checksumSync: hash.checksumSync,
  // bcrypt: bcryptjs.bcrypt, // see deprecation method below
  bcryptSync: bcryptjs.bcryptSync,
  bcryptCompare: bcryptjs.bcryptCompare,
  bcryptCompareSync: bcryptjs.bcryptCompareSync,
  randomString: random.randomString,
  randomNumber: random.randomNumber,

  /* deprecated methods */

  decrypt (value, key) {
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

  bcrypt (value, options) {
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
