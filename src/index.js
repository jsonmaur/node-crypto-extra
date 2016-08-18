import crypto from 'crypto'
import { encrypt, decrypt, generateKey } from './encryption'
import { hash } from './hash'
import { bcryptHash, bcryptCompare } from './bcrypt'
import { randomString, randomNumber } from './random'

module.exports = Object.assign(crypto, {
  encrypt, decrypt, generateKey, // from encryption
  hash, // from hash
  bcryptHash, bcryptCompare, // from bcrypt
  randomString, randomNumber // from random

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
