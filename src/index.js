import crypto from 'crypto'
import { encrypt, decrypt, generateKey } from './encryption'
import { hash } from './hash'
import { randomString, randomNumber } from './random'

module.exports = Object.assign(crypto, {
  generateKey,
  encrypt,
  decrypt,
  hash,
  randomString,
  randomNumber,

  /* deprecated methods */
  bcryptHash: () => deprecationNotice('bcrypt is no longer supported in this module! See https://github.com/jsonmaur/node-crypto-extra/issues/1'),
  bcryptCompare: () => deprecationNotice('bcrypt is no longer supported in this module! See https://github.com/jsonmaur/node-crypto-extra/issues/1')
})

function deprecationNotice (msg) {
  console.log(`crypto-extra: ${msg}`)
}
