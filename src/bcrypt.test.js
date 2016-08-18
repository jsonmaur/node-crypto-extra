import test from 'ava'
import { bcryptHash, bcryptCompare } from '../src'

test('bcryptHash()', async (t) => {
  const reg = /^\$2/
  t.regex(await bcryptHash('test'), reg)
  await t.throws(() => bcryptHash(1), TypeError)
})

test('bcryptCompare()', async (t) => {
  const hash = '$2a$10$q9797EeNmD5z5913sE8X0uOopk9aftTUPLqishzkeLXwTAHkoMUbW'
  t.true(await bcryptCompare('test', hash))
  t.false(await bcryptCompare('hi', hash))
  await t.throws(() => bcryptCompare(1, hash), TypeError)
})
