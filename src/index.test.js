import test from 'ava'
import crypto from '../src'

test((t) => {
  t.is(typeof crypto.createHmac, 'function')
  t.is(typeof crypto.randomString, 'function')
})
