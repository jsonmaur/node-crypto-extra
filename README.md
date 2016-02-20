# Node.js crypto-extra
[![Build Status](https://travis-ci.org/jsonmaur/node-crypto-extra.svg?branch=master)](https://travis-ci.org/jsonmaur/node-crypto-extra)
[![Coverage Status](https://coveralls.io/repos/github/jsonmaur/node-crypto-extra/badge.svg?branch=master)](https://coveralls.io/github/jsonmaur/node-crypto-extra?branch=master)

Adds a few convenience methods to the native Node.js module `crypto`. It is a drop in replacement for [crypto](https://nodejs.org/api/crypto.html), meaning it extends the original functionality with the extra methods on top.

## Why?

The native `crypto` module requires a lot of boilerplate to do things such as hashing and encryption. This takes care of the boilerplate allowing cleaner code.

## Getting Started

```bash
npm install -g crypto-extra
```

To use in your project, simply require into your project as you would the `crypto` module, and go crazy!

```javascript
var crypto = require('crypto-extra')

// also supports ES6 modules
import crypto from 'crypto-extra'
// and destructuring
import { hash, random } from 'crypto-extra'
```

## API

- [encrypt](#encrypt)
- [decrypt](#decrypt)
- [hash](#hash)
- [bcrypt](#bcrypt)
- [random](#random)
- [all other native crypto methods](https://nodejs.org/api/crypto.html)

<a name="encrypt"></a>
### encrypt (value, [secretKey])

Encrypts a value using AES256-CTR.

- `value` The value you want to encrypt. Supports strings, numbers, and objects.
- `secretKey` Optional. The secret key used to encrypt your value. Will fallback to the environment variable `ENCRYPTION_KEY`, and will throw an error if a secret key isn't provided or is not an environment variable.

```javascript
var encrypted = crypto.encrypt('my-message', 'secret-key') // encrypt a string
var encrypted = crypto.encrypt({foo: 'bar'}, 'secret-key') // encrypt an object
```

<a name="decrypt"></a>
### decrypt (value, [secretKey])

Decrypts a value that was encrypted using AES256-CTR.

- `value` The encrypted string you want to decrypt.
- `secretKey` Optional. The secret key used to encrypt your value. Will fallback to the environment variable `ENCRYPTION_KEY`.

```javascript
var decrypted = crypto.decrypt('af1ed6d214', 'secret-key')
```

<a name="hash"></a>
### hash (value, [options])

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

<a name="bcrypt"></a>
### bcrypt (value, [hashToCompare])

Returns a promise with the hash. If comparing a string to a hash, it will return a boolean.

- `value` The value you want to hash with bcrypt
- `hashToCompare` Optional value. If provided, it will attempt to validate the hash. (ex. comparing a password to a hashed value in the database).

```javascript
/* to hash */
crypto.bcrypt('my-password')
  .then(function(hash) {
    /* store hash in db */
  })

/* to validate a hash */
var hash = '$2a$10$4aIbKI4tBwDxoHeLMsuPseVsLyIL/PgDgVz2K5MwyM9jWbjYDbAZW'
crypto.bcrypt('my-password', hash)
  .then(function(isValid) {
    /* make sure password is valid */
  })
```

<a name="random"></a>
### random (length)

Returns a random string of any defined length.

- `length` [default: `32`] The length of the string you want. Must be an even number above 0.

```javascript
var randomString = crypto.random() // length of 32
var randomString = crypto.random(64) // length of 64
```

## Contributing & Testing
`crypto-extra` is built with ES2015 features, so Babel compilation is necesary. Run `npm run build` to compile.

To run tests, make sure you install dependencies with `npm install`, then just run `npm test`.
