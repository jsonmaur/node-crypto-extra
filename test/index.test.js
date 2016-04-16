import test from 'ava'
import crypto from '../src'
import { logWatch } from './_helpers'

test((t) => {
  t.is(typeof crypto.createHmac, 'function')
  t.is(typeof crypto.randomString, 'function')
})

test('deprecations', (t) => {
  t.regex(logWatch(crypto.random, 10)[0], /randomString/)
  t.regex(logWatch(crypto.bcrypt, 'hi', 'hey')[0], /bcryptCompare/)
  t.regex(logWatch(crypto.decrypt, 'fca434', 'hey')[0], /outdated/)
})
