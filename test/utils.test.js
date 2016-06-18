import test from 'ava'
import { parseObject, stringify } from '../src/utils'

test('parseObject()', (t) => {
  const obj = { test: 'testing' }
  const objStr = '{ "test": "testing" }'
  t.deepEqual(parseObject(obj), obj)
  t.deepEqual(parseObject(objStr), obj)
  t.false(parseObject('hi'))
})

test('stringify()', (t) => {
  t.is(typeof stringify(1), 'string')
  t.is(typeof stringify({ hey: 'hi' }), 'string')
  t.regex(stringify({ hey: 'hi' }), /^{/)
})
