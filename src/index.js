import crypto from 'crypto'
import * as encryption from './encryption'
import * as hash from './hash'
// import * as bcrypt from './bcrypt'
import * as random from './random'

module.exports = Object.assign(crypto, {
  encrypt: encryption.encrypt,
  decrypt: encryption.decrypt,
  getHash: hash.getHash,
  getChecksum: hash.getChecksum,
  getChecksumSync: hash.getChecksumSync,
  // bcrypt,
  randomString: random.randomString,
  randomNumber: random.randomNumber,
  randomFromArray: random.randomFromArray,

  /* depricated methods */

  random (size) {
    depricationNotice('random', 'randomString')
    return random.randomString(size)
  },

  hash (value, options) {
    depricationNotice('hash', 'getHash')
    return hash.getHash(value, options)
  },
})

function depricationNotice (oldName, newName) {
  console.log(`crypto-extra: ${oldName}() is now depricated! use ${newName}() instead.`)
}
