# Node.js crypto-extra
[![Build Status](https://travis-ci.org/jsonmaur/node-crypto-extra.svg?branch=master)](https://travis-ci.org/jsonmaur/node-crypto-extra)
[![Coverage Status](https://coveralls.io/repos/github/jsonmaur/node-crypto-extra/badge.svg?branch=master)](https://coveralls.io/github/jsonmaur/node-crypto-extra?branch=master)

> Adds convenience methods to the native Node.js [crypto module](https://nodejs.org/api/crypto.html). It is a drop in replacement, meaning it extends the original functionality with additional methods.

- [Getting Started](#getting-started)
- [API](#api)
  - [encrypt](#api-encrypt)
  - [decrypt](#api-decrypt)
  - [hash](#api-hash)
  - [bcrypt](#api-bcrypt)
  - [random](#api-random)
  - [all other native crypto methods](https://nodejs.org/api/crypto.html)
- [Testing and Contributing](#testing)

## Why?

The native `crypto` module requires a lot of boilerplate to do things such as hashing and encryption. This takes care of the boilerplate allowing much cleaner code.

<a name="getting-started"></a>
## Getting Started

```bash
npm install crypto-extra -g
```

To use in your project, simply require into your project as you would the `crypto` module, and go crazy!

```javascript
/* with ES5 */
var crypto = require('crypto-extra')
/* with ES6 */
import crypto from 'crypto-extra'
/* with ES6 destructuring */
import { hash, random } from 'crypto-extra'
```

<a name="api"></a>
## API

<a name="api-encrypt"></a>
#### .encrypt(value, [secretKey])

Encrypts a value using AES256-CTR.

- `value` The value you want to encrypt. Supports strings, numbers, and objects.
- `secretKey` Optional. The secret key used to encrypt your value. Will fallback to the environment variable `ENCRYPTION_KEY`, and will throw an error if a secret key isn't provided or is not an environment variable.

```javascript
/* encrypt a string */
var encrypted = crypto.encrypt('my-message', 'secret-key')

/* encrypt an object */
var encrypted = crypto.encrypt({foo: 'bar'}, 'secret-key')
```

<a name="api-decrypt"></a>
#### .decrypt(value, [secretKey])

Decrypts a value that was encrypted using AES256-CTR.

- `value` The encrypted string you want to decrypt.
- `secretKey` Optional. The secret key used to encrypt your value. Will fallback to the environment variable `ENCRYPTION_KEY`.

```javascript
var decrypted = crypto.decrypt('af1ed6d214', 'secret-key')
```

<a name="api-hash"></a>
#### .hash(value, [options])

Hashes a string with the provided algorithm.

- `value` The value you want to hash.
- `options`
  - `salt` Will be appended to the string before it is hashed.
  - `algorithm` [default: `SHA256`] The hashing algorithm to use.

```javascript
var hashed = crypto.hash('my-message') // SHA256
var hashed = crypto.hash('my-message', { salt: 'this-is-a-salt' }) // SHA256 with salt
var hashed = crypto.hash('my-message', { algorithm: 'MD5' }) // MD5
```

<a name="api-bcrypt"></a>
#### .bcrypt(value, [hashToCompare])

Returns a promise with the hash. If comparing a string to a hash, it will return a boolean.

- `value` The value you want to hash with bcrypt
- `hashToCompare` Optional value. If provided, it will attempt to validate the hash. (ex. comparing a password to a hashed value in the database).

```javascript
/* to hash */
crypto.bcrypt('my-password')
  .then(function(hash) {
    /* do what you will with the hash */
  })

/* to validate a hash */
var hash = '$2a$10$4aIbKI4tBwDxoHeLMsuPseVsLyIL/PgDgVz2K5MwyM9jWbjYDbAZW'
crypto.bcrypt('my-password', hash)
  .then(function(isValid) {
    /* isValid will be true or false */
  })
```

<a name="api-random"></a>
#### .random(length)

Returns a random string of any defined length.

- `length` [default: `10`] The length of the string you want. Must be an integer above 0.

```javascript
/* random string with default length (10) */
var randomString = crypto.random()

/* with length of 20 */
var randomString = crypto.random(20)
```

<a name="testing"></a>
## Testing and Contributing
```bash
git clone https://github.com/jsonmaur/node-crypto-extra.git
cd node-crypto-extra
npm install
npm test
```

`crypto-extra` is built with ES2015 features, so Babel compilation is necessary. Run `npm run build` to transpile.


If you want to contribute or come across an issue that you know how to fix, [just do it](https://www.youtube.com/watch?v=ZXsQAXx_ao0).
