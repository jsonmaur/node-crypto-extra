var crypto = require('../lib')

// -----------------------------------------------------------------------------
// encrypt and decrypt
// -----------------------------------------------------------------------------

var secretKey = 'this-is-a-secret!'

var encrypted = crypto.encrypt('welcome', secretKey)
console.log('encrypted:', encrypted)

var decrypted = crypto.decrypt(encrypted, secretKey)
console.log('decrypted:', decrypted)
