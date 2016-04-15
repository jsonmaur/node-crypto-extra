var crypto = require('../lib')
var path = require('path')

// -----------------------------------------------------------------------------
// checksums
// -----------------------------------------------------------------------------

var file = path.resolve(__dirname, '../LICENSE')

crypto.checksum(file).then(function(sum) {
  console.log('checksum:', sum)
})

crypto.checksum(file, { algorithm: 'sha256' }).then(function(sum) {
  console.log('checksum with sha256:', sum)
})

var sum = crypto.checksumSync(file)
console.log('checksum sync:', sum)
