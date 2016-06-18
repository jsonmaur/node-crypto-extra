import test from 'ava'
import { encrypt, decrypt, generateKey } from '../src'

const secretKey = 'asdfasdfasdfasdfasdfasdfasdfasdf'

test('encrypt()', (t) => {
  t.is(decrypt(encrypt('hey', secretKey), secretKey), 'hey')
  t.is(typeof encrypt('hey', secretKey), 'string')
  t.is(typeof encrypt(100, secretKey), 'string')
  t.is(typeof encrypt({ hello: 'hey' }, secretKey), 'string')
  t.is(typeof encrypt(true, secretKey), 'string')
  t.is(typeof encrypt('hey', 'hello'), 'string')
  t.throws(() => encrypt('hey', ''), Error)
  t.throws(() => encrypt('hey'), Error)
})

test('decrypt()', (t) => {
  const encryptedStr = 'ae8f31$9aef670513191e77b51d3948bc0ea539$33a8b27803725fd7e8c5641548b43b545a876767219e9badc280be8e3aff8bba'
  const encryptedObj = '55bc46634486927655e1c9e7a514ae$f5ba32e5cc42e78f5a07bcfe0645f668$d9a20b941a6ffdb64526055d388a1411e8227afd978dcec7f7aa110085a218b8'
  const encryptedObjTampered = '55bc46634486927655e1c9e7a514ae$f5ba32e5cc42e78f5a07bcfe0645f668$d9a20b941a6ffdb64526055d388a1411e8227afd978dcec7f7aa110085a218b9'
  t.is(decrypt(encryptedStr, secretKey), 'hey')
  t.deepEqual(decrypt(encryptedObj, secretKey), { hello: 'hey' })
  t.throws(() => decrypt('hi$'), Error)
  t.throws(() => decrypt(12345, secretKey), TypeError)
  t.throws(() => decrypt('hey$', 'short-secret-key'), Error)
  t.throws(() => decrypt(encryptedObjTampered, secretKey), Error)
})

test('generateKey()', (t) => {
  t.is(typeof generateKey(), 'string')
  t.is(generateKey().length, 64)
  t.is(generateKey(10).length, 10)
  t.is(generateKey(152).length, 152)
  t.throws(() => generateKey(65), Error)
  t.throws(() => generateKey(0), Error)
})
