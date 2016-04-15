import crypto from 'crypto'
import * as encryption from './encryption'
import * as hash from './hash'
import * as bcryptjs from './bcrypt'
import * as random from './random'

module.exports = Object.assign(crypto, {
  encrypt: encryption.encrypt,
  decrypt: encryption.decrypt,
  getHash: hash.getHash,
  getChecksum: hash.getChecksum,
  getChecksumSync: hash.getChecksumSync,
  // bcrypt: bcryptjs.bcrypt, // see deprecation method below
  bcryptSync: bcryptjs.bcryptSync,
  bcryptCompare: bcryptjs.bcryptCompare,
  bcryptCompareSync: bcryptjs.bcryptCompareSync,
  randomString: random.randomString,
  randomNumber: random.randomNumber,

  /* deprecated methods */

  random (size) {
    deprecationNotice('random', 'randomString')
    return random.randomString(size)
  },

  hash (value, options) {
    deprecationNotice('hash', 'getHash')
    return hash.getHash(value, options)
  },

  bcrypt (value, options) {
    if (typeof options === 'string') {
      deprecationNotice('bcryptCompare')
      return bcryptjs.bcryptCompare(value, options)
    }

    return bcryptjs.bcrypt(value, options)
  },
})

function deprecationNotice (oldName, newName) {
  const first = oldName ? `${oldName}() is now deprecated!` : null
  const second = newName ? `use ${newName}() instead.` : null
  console.log(`crypto-extra: ${first} ${second}`)
}
