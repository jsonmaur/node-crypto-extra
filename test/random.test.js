import test from 'ava'
import * as rand from '../src/random'

test('randomString()', (t) => {
  t.is(typeof rand.randomString(), 'string')
  t.is(rand.randomString().length, 10)
  t.is(rand.randomString(20).length, 20)
  t.throws(() => rand.randomString(0), Error)
  t.throws(() => rand.randomString(-5), Error)
  t.throws(() => rand.randomString('5'), TypeError)
})

test('randomNumber()', (t) => {
  t.true(rand.randomNumber() > 0)
  t.is(typeof rand.randomNumber(), 'number')
  t.is(typeof rand.randomNumber({ length: 10 }), 'string')
  t.is(rand.randomNumber({ length: 20 }).length, 20)
  t.throws(() => rand.randomNumber({ max: 9007199254740992 }))
  t.throws(() => rand.randomNumber({ min: -1 }))
  t.throws(() => rand.randomNumber({ max: -1 }))

  const min = 100
  const max = 150
  for (let i = 0; i < 10000; i++) {
    const num = rand.randomNumber({ min, max })
    t.true(num >= min)
    t.true(num <= max)
  }
})

test('randomFromArray()', (t) => {
  const arr = [1, 2, 3, 4, 5]
  t.true(arr.indexOf(rand.randomFromArray(arr)) !== -1)
})
