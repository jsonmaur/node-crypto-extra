import test from 'ava'
import {
  getEncryptionKey,
  constantTimeCompare,
} from '../src/encryption'
import {
  encrypt,
  decrypt,
  generateKey,
} from '../src'

const secretKey = 'asdfasdfasdfasdfasdfasdfasdfasdf'

test('encrypt()', (t) => {
  t.is(decrypt(encrypt('hey', secretKey), secretKey), 'hey')
  t.is(typeof encrypt('hey', secretKey), 'string')
  t.is(typeof encrypt(100, secretKey), 'string')
  t.is(typeof encrypt({ hello: 'hey' }, secretKey), 'string')
  t.is(typeof encrypt(true, secretKey), 'string')
  t.throws(() => encrypt('hey'), Error)
  t.throws(() => encrypt('hey', 'short-secret-key'), Error)
})

test('decrypt()', (t) => {
  const encryptedStr = 'fef977$bf6e6aa21066a003ee00c0c6e2603750$787e8676e21fd1315b2a30617853078ca22f33484c9b4c46bf5af8e2b8192ec2'
  const encryptedObj = '4d7f671a484cc86a42ff7bc57cec81$51222d02300baedcb12e59667815f88b$83652613ab0e69c3ea028d719d040f21d7ac6238f3b5a426458494d3390ef083'
  const encryptedObjTampered = '4d7f671a484cc86a42ff7bc57cec81$51222d02300baedcb12e59667815f88b$83652613ab0e69c3ea028d719d040f21d7ac6238f3b5a426458494d3390ef08'
  t.is(decrypt(encryptedStr, secretKey), 'hey')
  t.deepEqual(decrypt(encryptedObj, secretKey), { hello: 'hey' })
  t.throws(() => decrypt('hi$'), Error)
  t.throws(() => decrypt(12345, secretKey), TypeError)
  t.throws(() => decrypt('hey$', 'short-secret-key'), Error)
  t.throws(() => decrypt(encryptedObjTampered, secretKey), Error)
})

test('constantTimeCompare()', (t) => {
  t.true(constantTimeCompare('cf80cd8aed482d5d1527d7dc72fceff84e6326592848447d2dc0b0e87dfc9a90', 'cf80cd8aed482d5d1527d7dc72fceff84e6326592848447d2dc0b0e87dfc9a90'))
  t.false(constantTimeCompare('cf80cd8aed482d5d1527d7dc72fceff84e6326592848447d2dc0b0e87dfc9a90', 'cf80cd8aed482d5d1527d7dc72fceff84e6326592848447d2dc0b0e87dfc9a9'))
})

test('getEncryptionKey()', (t) => {
  t.is(getEncryptionKey('12345'), '12345')
  t.throws(() => getEncryptionKey(), Error)
})

test('getEncryptionKey() from env', (t) => {
  process.env.ENCRYPTION_KEY = '54321'
  t.is(getEncryptionKey(), '54321')
})

test('generateKey()', (t) => {
  t.is(typeof generateKey(), 'string')
  t.is(generateKey().length, 64)
})
