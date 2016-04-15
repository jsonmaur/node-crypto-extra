import test from 'ava'
import { getEncryptionKey } from '../src/encryption'
import {
  encrypt,
  decrypt,
} from '../src'

const secretKey = 'this-is-the-secret-key'

test('encrypt()', (t) => {
  t.is(encrypt('hey', secretKey), 'fca434')
  t.is(encrypt(100, secretKey), 'a5f17d')
  t.is(encrypt({hello: 'hey'}, secretKey), 'efe3255c682361e55d85ac58e7af91')
  t.is(encrypt(true, secretKey), 'e0b3385c')
  t.throws(() => encrypt('hey'), Error)
})

test('decrypt()', (t) => {
  t.is(decrypt('fca434', secretKey), 'hey')
  t.deepEqual(decrypt('efe3255c682361e55d85ac58e7af91', secretKey), { hello: 'hey' })
  t.throws(() => decrypt('hi'), Error)
  t.throws(() => decrypt(12345, secretKey), TypeError)
})

test('getEncryptionKey()', (t) => {
  t.is(getEncryptionKey('12345'), '12345')
  t.throws(() => getEncryptionKey(), Error)
})

test('getEncryptionKey() from env', (t) => {
  process.env.ENCRYPTION_KEY = '54321'
  t.is(getEncryptionKey(), '54321')
})
