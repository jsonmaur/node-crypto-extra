var test = require('blue-tape')
var crypto = require('../lib/index')

test('crypto', function(t) {

  t.test('encrypt()', function(st) {
    st.plan(4)
    st.equal(
      crypto.encrypt('hey', 'secret'),
      '32950d',
      'encrypt a string')
    st.equal(
      crypto.encrypt(100, 'secret'),
      '6bc044',
      'encrypt a number')
    st.equal(
      crypto.encrypt({hello: 'hey'}, 'secret'),
      '21d21c968c2fa0fe37128f41803069',
      'encrypt an object')
    st.equal(
      crypto.encrypt(true, 'secret'),
      undefined,
      'encrypt an invalid value')
  })

  t.test('decrypt()', function(st) {
    st.plan(3)
    st.equal(
      crypto.decrypt('32950d', 'secret'),
      'hey',
      'decrypt a string')
    st.deepEqual(
      crypto.decrypt('21d21c968c2fa0fe37128f41803069', 'secret'),
      {hello: 'hey'},
      'decrypt an object')
    st.equal(
      crypto.decrypt(true, 'secret'),
      undefined,
      'decrypt an invalid value')
  })

  t.test('hash()', function(st) {
    st.plan(2)
    st.equal(
      crypto.hash('hey'),
      'baeb867c70224060d6f46ed1a8d7f5eab765c1785048afd7c37e320e7f86eeda',
      'hash a string with sha256')
    st.equal(
      crypto.hash('hey', 'md5'),
      '8d4e533358362e22c742567ec589143a',
      'hash a string with md5')
  })

  t.test('bcrypt()', function(st) {
    return crypto.bcrypt('hey')
      .then(hash => {
        st.equal(
          typeof hash,
          'string',
          'should be a string')
        st.not(
          hash.indexOf('$'),
          -1,
          'should include a dollar sign')
      })
  })

  t.test('bcrypt() compare', function(st) {
    var hashed = '$2a$10$Y9k5MdpqPHx5ZCV7F7sq/OytrUY.uwUJURLgTiTdknJso.in/Qnr2'
    return crypto.bcrypt('hey', hashed)
      .then(res => st.ok(res, 'hashes match'))
      .then(() => crypto.bcrypt('heyy', hashed))
      .then(res => st.notOk(res, 'hashes do not match'))
  })

  t.test('random()', function(st) {
    st.plan(4)
    st.equal(
      crypto.random().length,
      32,
      'random with length of 32')
    st.equal(
      crypto.random(64).length,
      64,
      'random with length of 64')
    st.throws(
      () => crypto.random(0),
      'random with length 0')
    st.throws(
      () => crypto.random(31),
      'random with odd length')
  })

})
