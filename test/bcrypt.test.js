import test from 'ava'
import {
  bcrypt, bcryptSync,
  bcryptCompare, bcryptCompareSync,
} from '../src'

test('bcrypt()', async (t) => {
  const reg = /^\$2/
  t.regex(await bcrypt('test'), reg)
  t.regex(bcryptSync('test'), reg)
  await t.throws(() => bcrypt(1), TypeError)
})

test('bcryptCompare()', async (t) => {
  const hash = '$2a$10$q9797EeNmD5z5913sE8X0uOopk9aftTUPLqishzkeLXwTAHkoMUbW'
  t.true(await bcryptCompare('test', hash))
  t.false(await bcryptCompare('hi', hash))
  t.true(bcryptCompareSync('test', hash))
  t.false(bcryptCompareSync('hi', hash))
  await t.throws(() => bcryptCompare(1, hash), TypeError)
})
