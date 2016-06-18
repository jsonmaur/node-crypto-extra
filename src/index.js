import crypto from 'crypto'
import * as encryption from './encryption'
import * as hash from './hash'
import * as bcrypt from './bcrypt'
import * as random from './random'

module.exports = Object.assign(crypto, {
  encrypt: encryption.encrypt,
  decrypt: encryption.decrypt,
  generateKey: encryption.generateKey,
  hash: hash.hash,
  bcryptHash: bcrypt.bcryptHash,
  bcryptCompare: bcrypt.bcryptCompare,
  randomString: random.randomString,
  randomNumber: random.randomNumber,

  /* deprecated methods */
  // none! :)
})

// function deprecationNotice (oldName, newName, msg) {
//   const first = oldName ? `${oldName}() is now deprecated. ` : ''
//   const second = newName ? `use ${newName}() instead.` : ''
//
//   if (msg) console.log(`crypto-extra: ${msg}`)
//   else console.log(`crypto-extra: ${first}${second}`)
// }
