import test from 'ava'
import * as crypt from '../src/encryption'

const secretKey = 'this-is-the-secret-key'

test('encrypt()', (t) => {
  t.is(crypt.encrypt('hey', secretKey), 'fca434')
  t.is(crypt.encrypt(100, secretKey), 'a5f17d')
  t.is(crypt.encrypt({hello: 'hey'}, secretKey), 'efe3255c682361e55d85ac58e7af91')
  t.is(crypt.encrypt(true, secretKey), 'e0b3385c')
  t.throws(() => crypt.encrypt('hey'), Error)
})

test('decrypt()', (t) => {
  t.is(crypt.decrypt('fca434', secretKey), 'hey')
  t.deepEqual(crypt.decrypt('efe3255c682361e55d85ac58e7af91', secretKey), { hello: 'hey' })
  t.throws(() => crypt.decrypt('hi'), Error)
  t.throws(() => crypt.decrypt(12345, secretKey), TypeError)
})

test('getEncryptionKey()', (t) => {
  t.is(crypt.getEncryptionKey('12345'), '12345')
  t.throws(() => crypt.getEncryptionKey(), Error)
})

test('getEncryptionKey() from env', (t) => {
  process.env.ENCRYPTION_KEY = '54321'
  t.is(crypt.getEncryptionKey(), '54321')
})
