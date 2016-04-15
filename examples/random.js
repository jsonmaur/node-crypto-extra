var crypto = require('../lib')

// -----------------------------------------------------------------------------
// random
// -----------------------------------------------------------------------------

var randStr = crypto.randomString()
console.log('random string:', randStr)

var randStrWithOptions = crypto.randomString(5, 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ')
console.log('random string with options:', randStrWithOptions)

var randNum = crypto.randomNumber()
console.log('random number:', randNum)

var randNumWithOptions = crypto.randomNumber({ min: 100, max: 200 })
console.log('random number with options:', randNumWithOptions)

var randNumWithLen = crypto.randomNumber({ length: 20 })
console.log('random number with length:', randNumWithLen)
