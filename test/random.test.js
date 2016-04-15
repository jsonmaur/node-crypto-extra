import test from 'ava'
import {
  randomString,
  randomNumber,
} from '../src/random'

test('randomString()', (t) => {
  t.is(typeof randomString(), 'string')
  t.is(randomString().length, 10)
  t.is(randomString(20).length, 20)
  t.throws(() => randomString(0), Error)
  t.throws(() => randomString(-5), Error)
  t.throws(() => randomString('5'), TypeError)
})

test('randomNumber()', (t) => {
  t.true(randomNumber() > 0)
  t.is(typeof randomNumber(), 'number')
  t.is(typeof randomNumber({ length: 10 }), 'string')
  t.is(randomNumber({ length: 20 }).length, 20)
  t.throws(() => randomNumber({ max: Number.MAX_SAFE_INTEGER + 1 }))
  t.throws(() => randomNumber({ min: -1 }))
  t.throws(() => randomNumber({ max: -1 }))

  const min = 100
  const max = 150
  for (let i = 0; i < 10000; i++) {
    const num = randomNumber({ min, max })
    t.true(num >= min)
    t.true(num <= max)
  }
})
