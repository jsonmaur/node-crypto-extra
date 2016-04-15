var crypto = require('../lib')

// -----------------------------------------------------------------------------
// hashing examples
// -----------------------------------------------------------------------------

var sha1Hash = crypto.hash('welcome')
console.log('SHA1 hash:', sha1Hash)

var md5Hash = crypto.hash('welcome', {
  algorithm: 'md5',
})
console.log('MD5 hash:', md5Hash)

var md5HashWithSalt = crypto.hash('welcome', {
  algorithm: 'md5',
  salt: 'this-is-a-salt',
})
console.log('MD5 hash with salt:', md5HashWithSalt)
