var crypto = require('../lib')

// -----------------------------------------------------------------------------
// bcrypt
// -----------------------------------------------------------------------------

crypto.bcrypt('a-password').then(function(hash) {
  console.log('bcrypt:', hash)
})

var hash = crypto.bcryptSync('a-password')
console.log('bcrypt sync:', hash)

crypto.bcryptCompare('a-password', hash).then(function(res) {
  console.log('bcrypt compare with valid value:', res)
})

crypto.bcryptCompare('invalid-password', hash).then(function(res) {
  console.log('bcrypt compare with invalid value:', res)
})

var res = crypto.bcryptCompareSync('a-password', hash)
console.log('bcrypt compare sync:', res)
