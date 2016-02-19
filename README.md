# Node.js crypto-extra
[![Build Status](https://travis-ci.org/jsonmaur/node-crypto-extra.svg?branch=master)](https://travis-ci.org/jsonmaur/node-crypto-extra)
[![Coverage Status](https://coveralls.io/repos/github/jsonmaur/node-crypto-extra/badge.svg?branch=master)](https://coveralls.io/github/jsonmaur/node-crypto-extra?branch=master)

`crypto-extra` adds a few convenience methods to the native Node.js module `crypto`. It is a drop in replacement for `crypto`, meaning it extends the original functionality with the extra methods on top.

## Why?

The native `crypto` module requires a lot of boilerplate to do things such as hashing and encryption. This takes care of the boilerplate for you allowing you to maintain cleaner code.

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

- `value` The value you want to encrypt. Uses AES256-CTR. Supports strings, numbers, and objects.
- `secretKey` The secret key used to encrypt your value. This is optional, and will fallback to the environment variable `ENCRYPTION_KEY`.

```javascript
var encrypted = crypto.encrypt('my-message', 'secret-key') // encrypt a string

var encrypted = crypto.encrypt({foo: 'bar'}, 'secret-key') // encrypt an object
```

<a name="decrypt"></a>
### decrypt (value, [secretKey])

- `value` The AES256-CTR encrypted string you want to decrypt.
- `secretKey` The secret key used to encrypt your value. This is optional, and will fallback to the environment variable `ENCRYPTION_KEY`.

```javascript
var decrypted = crypto.decrypt('af1ed6d214', 'secret-key')
```

<a name="hash"></a>
### hash (value, algorithm)

- `value` The value you want to hash.
- `algorithm` [default: `SHA256`] The hashing algorithm you want to use.

```javascript
var hashed = crypto.hash('my-message') // SHA256

var hashed = crypto.hash('my-message', 'MD5') // MD5
```

<a name="bcrypt"></a>
### bcrypt (value, [hashToCompare])

Returns a promise with the hash or boolean if comparing.

- `value` The value you want to hash with bcrypt
- `hashToCompare` Optional value. If provided, it will attempt to validate the hash. (ex. comparing a password to a hashed value in the database).

```javascript
/* to hash */
crypto.bcrypt('my-password')
  .then(hash => {
    /* store hash in db */
  })

/* to validate a hash */
var hash = '$2a$10$4aIbKI4tBwDxoHeLMsuPseVsLyIL/PgDgVz2K5MwyM9jWbjYDbAZW'
crypto.bcrypt('my-password', hash)
  .then(isValid => {
    /* make sure password is valid */
  })
```

<a name="random"></a>
### random (length)

Returns a random string of any defined length.

- `length` [default: `32`] The length of the string you want

```javascript
var randomString = crypto.random() // length of 32

var randomString = crypto.random(64) // length of 64
```
