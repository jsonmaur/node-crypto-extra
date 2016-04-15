import test from 'ava'
import * as utils from '../src/utils'

test('parseObject()', (t) => {
  const obj = { test: 'testing' }
  const objStr = '{ "test": "testing" }'
  t.deepEqual(utils.parseObject(obj), obj)
  t.deepEqual(utils.parseObject(objStr), obj)
  t.false(utils.parseObject('hi'))
})

test('stringify()', (t) => {
  t.is(typeof utils.stringify(1), 'string')
  t.is(typeof utils.stringify({ hey: 'hi' }), 'string')
  t.regex(utils.stringify({ hey: 'hi' }), /^{/)
})
