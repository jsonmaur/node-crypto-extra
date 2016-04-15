import path from 'path'
import test from 'ava'
import {
  hash,
  checksum, checksumSync,
} from '../src'

test('hash()', (t) => {
  t.is(hash('testing'), 'dc724af18fbdd4e59189f5fe768a5f8311527050')
  t.is(hash('testing', { algorithm: 'md5' }), 'ae2b1fca515949e5d54fb22b8ed95575')
  t.is(hash('testing', { salt: 'yo-this-is-a-salt' }), '44dd08fb4b87d1f84289e05bee9c56e574356abf')
  t.is(hash({ test: 'hi' }), '4ae5d90405ba6bd22c70830cf02c10e01c39674e')
  t.throws(() => hash())
})

test('checksum()', async (t) => {
  const file = path.resolve(__dirname, './_helpers.js')
  t.is(await checksum(file), '6d0eb448470a9be2473fda6d8a2713b9c7567fa5')
  t.is(checksumSync(file), '6d0eb448470a9be2473fda6d8a2713b9c7567fa5')
  await t.throws(checksum('./i-dont-exist'), Error)
  t.throws(() => checksumSync('./i-dont-exist'), Error)
})