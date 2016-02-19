var test = require('tape')
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
    st.plan(3)
    st.equal(
      crypto.hash('hey'),
      'fa690b82061edfd2852629aeba8a8977b57e40fcb77d1a7a28b26cba62591204',
      'hash a string with sha256')
    st.equal(
      crypto.hash('hey', {
        algorithm: 'md5'
      }),
      '6057f13c496ecf7fd777ceb9e79ae285',
      'hash a string with md5')
    st.equal(
      crypto.hash('hey', {
        salt: 'yo-this-is-a-salt'
      }),
      '823b71179cf443300b9e1bdecc326382502ad185d0661a06d54423a6c9a10b02',
      'hash a string with a salt')
  })

  t.test('bcrypt()', function(st) {
    crypto.bcrypt('hey')
      .then(function(hash) {
        st.equal(
          typeof hash,
          'string',
          'should be a string')
        st.not(
          hash.indexOf('$'),
          -1,
          'should include a dollar sign')
      })
      .then(st.end)
      .catch(st.error)
  })

  t.test('bcrypt() compare', function(st) {
    var hashed = '$2a$10$Y9k5MdpqPHx5ZCV7F7sq/OytrUY.uwUJURLgTiTdknJso.in/Qnr2'
    crypto.bcrypt('hey', hashed)
      .then(function(res) { st.ok(res, 'hashes match') })
      .then(function() { crypto.bcrypt('heyy', hashed) })
      .then(function(res) { st.notOk(res, 'hashes do not match') })
      .then(st.end)
      .catch(st.error)
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
      function() { crypto.random(0) },
      'random with length 0')
    st.throws(
      function() { crypto.random(31) },
      'random with odd length')
  })

  t.test('crypto()', function(st) {
    st.plan(1)
    st.equal(
      typeof crypto.createHmac,
      'function',
      'extends base crypto class')
  })

})
