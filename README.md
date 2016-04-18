# Node.js Crypto-Extra

[![Build Status](https://travis-ci.org/jsonmaur/node-crypto-extra.svg?branch=master)](https://travis-ci.org/jsonmaur/node-crypto-extra)
[![Coverage Status](https://coveralls.io/repos/github/jsonmaur/node-crypto-extra/badge.svg?branch=master)](https://coveralls.io/github/jsonmaur/node-crypto-extra?branch=master)

Adds convenience methods to the native Node.js [crypto module](https://nodejs.org/api/crypto.html). It is a drop in replacement, and extends the original module functionality.

- [Getting Started](#getting-started)
- [API](#api)
  - [encrypt](#api-encrypt)
  - [decrypt](#api-decrypt)
  - [generateKey](#api-generate)
  - [hash](#api-hash)
  - [checksum](#api-checksum)
  - [bcrypt](#api-bcrypt)
  - [bcryptCompare](#api-bcrypt-compare)
  - [randomString](#api-random-string)
  - [randomNumber](#api-random-number)
  - [native crypto methods](https://nodejs.org/api/crypto.html)
- [License](#license)

## Why?

The native `crypto` module can be a pain to work with, and requires a lot of boilerplate to do things such as randomizing and encryption. This abstracts all of that.

<a name="getting-started"></a>
## Getting Started

```bash
npm install crypto-extra --save
```

To use in your project, simply require into your project as you would the `crypto` module.

```javascript
var crypto = require('crypto-extra')

/* or with ES2015 */
import crypto from 'crypto-extra'
```

<a name="api"></a>
## API

<a name="api-encrypt"></a>
### .encrypt (value, secretKey)

Encrypts a value with a secret key using AES-256.

- **value** - The value you want to encrypt. Everything (except objects) is converted to a string before encryption for consistency. Objects are stringified using `JSON.stringify`.

  > Type: `any`  

- **secretKey** - The key used in the encryption. If not supplied, the lib will fallback to the environment variable `ENCRYPTION_KEY`. Must be at least 32 characters.

  > Type: `string`  
  > Default: `process.env.ENCRYPTION_KEY`

<a name="api-decrypt"></a>
### .decrypt (value, secretKey)

Decrypts a value using AES-256.

- **value** - The encrypted value you want to decrypt. Will automatically parse objects that were encrypted.

  > Type: `string`  

- **secretKey** - The key used in the encryption. If not supplied, the lib will fallback to the environment variable `ENCRYPTION_KEY`. Must be at least 32 characters.

  > Type: `string`  
  > Default: `process.env.ENCRYPTION_KEY`

<a name="api-generate"></a>
### .generateKey ()

Generates a random 256-bit key that can be used as an encryption key. Returns a 64-character string.

<a name="api-hash"></a>
### .hash (value, options)

Hashes a string with the provided algorithm.

- **value** - The value you want to hash. Any non-string value is converted to a string before hashing for consistency.

  > Type: `string`  

- **options**
  - **salt** - A string to be appended to the value before it is hashed.

    > Type: `string`  

  - **algorithm** - The hashing algorithm to use.

    > Type: `string`  
    > Default: `SHA256`

<a name="api-checksum"></a>
### .checksum (filepath, options)

Gets the checksum hash of a file. Returns a promise resolving with the sum.

*Can also be called with `.checksumSync()` for a synchronous version.*

- **filepath** - The path of the file you want a checksum for. This will be relative to the current working directory if not an absolute path.

  > Type: `string`  

- **options**
  - **algorithm** - The hashing algorithm to use.

    > Type: `string`  
    > Default: `SHA256`

<a name="api-bcrypt"></a>
### .bcrypt (value, options)

Get the bcrypt hash of a string. Returns a promise resolving with the hash.

*Can also be called with `.bcryptSync()` for a synchronous version.*

- **value** - The value you want to hash with bcrypt.

  > Type: `string`  

- **options**
  - **saltRounds** - The number of rounds to use for generating the salt.

    > Type: `integer`  
    > Default: `10`

<a name="api-bcrypt-compare"></a>
### .bcryptCompare (value, hash)

Compare a value to a bcrypt hash to validate whether they're the same. Returns a promise resolving with a boolean.

*Can also be called with `.bcryptCompareSync()` for a synchronous version.*

- **value** - The value to compare to the hash.

  > Type: `string`  

- **hash** - The bcrypt hash to use in the comparison.

  > Type: `string`  

<a name="api-random-string"></a>
### .randomString (length, charset)

Returns a random string of a defined length.

- **length** - Length of the random string. Must be above 0.

  > Type: `integer`  
  > Default: `10`

- **charset** - The character set to take from.

  > Type: `string`  
  > Default: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`

<a name="api-random-number"></a>
### .randomNumber (options)

Returns a random string within a defined range.

- **options**
  - **min** - Minimum number of range. Must be a positive integer.

    > Type: `integer`  
    > Default: `0`

  - **max** - Maximum number of range. This cannot be higher than `9007199254740991` due to Javascript integer limits (http://mzl.la/1A1nVyU). If you need a number higher than this, consider using [randomString](#api-random-string) with the charset `0123456789` instead.

    > Type: `integer`  
    > Default: `9007199254740991`

<a name="license"></a>
## License

[MIT](LICENSE) © [Jason Maurer](http://maur.co)
