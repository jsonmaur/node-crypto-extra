# Crypto-Extra for Node.js

[![Build Status](https://travis-ci.org/jsonmaur/node-crypto-extra.svg?branch=master)](https://travis-ci.org/jsonmaur/node-crypto-extra)
[![Coverage Status](https://coveralls.io/repos/github/jsonmaur/node-crypto-extra/badge.svg?branch=master)](https://coveralls.io/github/jsonmaur/node-crypto-extra?branch=master)

Adds convenience methods to the native Node.js [crypto module](https://nodejs.org/api/crypto.html). It is a drop in replacement, and extends the original module functionality.

-   [Getting Started](#getting-started)
-   [API](#api)
    -   [encrypt](#api-encrypt)
    -   [decrypt](#api-decrypt)
    -   [hash](#api-hash)
    -   [randomKey](#api-random-key)
    -   [randomString](#api-random-string)
    -   [randomNumber](#api-random-number)
    -   [native crypto methods](https://nodejs.org/api/crypto.html)

## Why?

The native `crypto` module can be a pain to work with, and requires a lot of boilerplate to do things such as randomizing and encryption. This abstracts all of that.

<a name="getting-started"></a>

## Getting Started

```bash
$ npm install crypto-extra --save
```

To use in your project, simply require into your project as you would the `crypto` module.

```javascript
const crypto = require("crypto-extra")

crypto.randomString()
//= L0e84MUt0n

crypto.hash("hello")
//= 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
```

<a name="api"></a>

## API

<a name="api-encrypt"></a>

### .encrypt (value, secretKey)

Encrypts a value with a secret key using AES-256-CTR.

-   **value** - The value you want to encrypt. Everything (except objects) is converted to a string before encryption for consistency. Objects are stringified using `JSON.stringify`.

    > Type: `any`

-   **secretKey** - The key used in the encryption. If not supplied, the lib will fallback to the environment variable `ENCRYPTION_KEY`.

    > Type: `string`  
    > Default: `process.env.ENCRYPTION_KEY`

<a name="api-decrypt"></a>

### .decrypt (value, secretKey)

Decrypts a value using AES-256-CTR.

-   **value** - The encrypted value you want to decrypt. Will automatically parse objects that were encrypted.

    > Type: `string`

-   **secretKey** - The key used in the encryption. If not supplied, the lib will fallback to the environment variable `ENCRYPTION_KEY`.

    > Type: `string`  
    > Default: `process.env.ENCRYPTION_KEY`

<a name="api-hash"></a>

### .hash (value, options)

Hashes a string with the provided algorithm.

-   **value** - The value you want to hash. Any non-string value is converted to a string before hashing for consistency.

    > Type: `string`

-   **options**

    -   **rounds** - The number of rounds to use when hashing.

        > Type: `integer`  
        > Default: `1`

    -   **salt** - A string to be appended to the value before it is hashed.

        > Type: `string`

    -   **algorithm** - The hashing algorithm to use.

        > Type: `string`  
        > Default: `SHA256`

<a name="api-random-key"></a>

### .randomKey (length)

Generates a random 256-bit key that can be used as an encryption key.

-   **length** - The length of the key you want to generate. **Must be an even number.**

    > Type: `number`  
    > Default: `32`

<a name="api-random-string"></a>

### .randomString (length, charset)

Returns a random string of a defined length.

-   **length** - Length of the random string. Must be above 0.

    > Type: `integer`  
    > Default: `10`

-   **charset** - The character set to take from.

    > Type: `string`  
    > Default: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`

<a name="api-random-number"></a>

### .randomNumber (options)

Returns a random string within a defined range.

-   **options**

    -   **min** - Minimum number of range. Must be a positive integer.

        > Type: `integer`  
        > Default: `0`

    -   **max** - Maximum number of range. This cannot be higher than `9007199254740991` due to Javascript integer limits (http://mzl.la/1A1nVyU). If you need a number higher than this, consider using [randomString](#api-random-string) with the charset `0123456789` instead.

        > Type: `integer`  
        > Default: `9007199254740991`

## License

[MIT](license) © [Jason Maurer](https://maur.co)
