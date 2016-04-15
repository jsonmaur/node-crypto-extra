import path from 'path'
import test from 'ava'
import * as hash from '../src/hash'

test('getHash()', (t) => {
  t.is(hash.getHash('testing'), 'dc724af18fbdd4e59189f5fe768a5f8311527050')
  t.is(hash.getHash('testing', { algorithm: 'md5' }), 'ae2b1fca515949e5d54fb22b8ed95575')
  t.is(hash.getHash('testing', { salt: 'yo-this-is-a-salt' }), '44dd08fb4b87d1f84289e05bee9c56e574356abf')
  t.is(hash.getHash({ test: 'hi' }), '4ae5d90405ba6bd22c70830cf02c10e01c39674e')
  t.throws(() => hash.getHash())
})

test('getChecksum()', async (t) => {
  const file = path.resolve(__dirname, './_helpers.js')
  t.is(await hash.getChecksum(file), '6d0eb448470a9be2473fda6d8a2713b9c7567fa5')
  t.is(hash.getChecksumSync(file), '6d0eb448470a9be2473fda6d8a2713b9c7567fa5')
  await t.throws(hash.getChecksum('./i-dont-exist'), Error)
  t.throws(() => hash.getChecksumSync('./i-dont-exist'), Error)
})
