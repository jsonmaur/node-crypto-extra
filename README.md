# Node.js Crypto-Extra
[![Build Status](https://travis-ci.org/jsonmaur/node-crypto-extra.svg?branch=master)](https://travis-ci.org/jsonmaur/node-crypto-extra)
[![Coverage Status](https://coveralls.io/repos/github/jsonmaur/node-crypto-extra/badge.svg?branch=master)](https://coveralls.io/github/jsonmaur/node-crypto-extra?branch=master)

> Adds convenience methods to the native Node.js [crypto module](https://nodejs.org/api/crypto.html). It is a drop in replacement, and extends the original module functionality.

- [Getting Started](#getting-started)
- [API](#api)
  - [encrypt](#api-encrypt)
  - [decrypt](#api-decrypt)
  - [getHash](#api-hash)
  - [bcrypt](#api-bcrypt)
  - [randomString](#api-random-string)
  - [randomNumber](#api-random-number)
  - [randomFromArray](#api-random-array)
  - [crypto methods](https://nodejs.org/api/crypto.html)
- [Testing and Contributing](#testing)

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

Encrypts a value with a secret key using AES-256-CTR.

- **value** - The value you want to encrypt. Everything (except objects) is converted to a string before encryption for consistency. Objects are stringified using `JSON.stringify`.
> Type: `any`  

- **secretKey** - The key used in the encryption. If not supplied, the lib will fallback to an environment variable.
> Type: `string`  
> Default: `process.env.ENCRYPTION_KEY`

<a name="api-decrypt"></a>
### .decrypt (value, secretKey)

Decrypts a value using AES-256-CTR.

- **value** - The encrypted value you want to decrypt. Will automatically parse objects that were encrypted.
> Type: `string`  

- **secretKey** - The key used in the encryption. If not supplied, the lib will fallback to an environment variable.
> Type: `string`  
> Default: `process.env.ENCRYPTION_KEY`

<a name="api-hash"></a>
### .getHash (value, options)

Hashes a string with the provided algorithm.

- **value** - The value you want to hash. Any non-string value is converted to a string before hashing for consistency.
> Type: `string`  

- **options**
  - **salt** - A string to be appended to the string before it is hashed.
  > Type: `string`  

  - **algorithm** - The hashing algorithm to use.
  > Type: `string`  
  > Default: `SHA1`

<a name="api-checksum"></a>
### .getChecksum (filepath, options)

Gets the checksum hash of a file.
*This can also be called with `.getChecksumSync()` for a synchronous version.*

- **filepath** - The path of the file you want a checksum for. This will be relative to the current working directory.
> Type: `string`  

- **options**
  - **algorithm** - The hashing algorithm to use.
  > Type: `string`  
  > Default: `SHA1`



<a name="api-bcrypt"></a>
### .bcrypt (value, [hashToCompare])

Returns a promise with the hash. If comparing a string to a hash, it will return a boolean.

- `value` The value you want to hash with bcrypt
- `hashToCompare` Optional value. If provided, it will attempt to validate the hash. (ex. comparing a password to a hashed value in the database).

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

Returns a random string of a defined length.

- **options**
  - **min** - Minimum number to return. Must be a positive integer.
  > Type: `integer`  
  > Default: `0`

  - **max** - Maximum number to return. This cannot be higher than `9007199254740991` due to Javascript integer limits (http://mzl.la/1A1nVyU). If you need a number higher than this, consider using `length` instead.
  > Type: `integer`  
  > Default: `9007199254740991`

  - **length** - The number of digits in the number to return (this will return a string rather than an integer).
  > Type: `integer`  

<a name="api-random-array"></a>
### .randomFromArray (arr)

Returns a random value from an array.

- **arr** - The array you want to pick a random value out of.
> Type: `array`  
