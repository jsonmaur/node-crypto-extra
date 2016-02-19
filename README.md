# crypto-extra
[![Build Status](https://travis-ci.org/jsonmaur/crypto-extra.svg?branch=master)](https://travis-ci.org/jsonmaur/crypto-extra)
[![Coverage Status](https://coveralls.io/repos/github/jsonmaur/crypto-extra/badge.svg?branch=master)](https://coveralls.io/github/jsonmaur/crypto-extra?branch=master)

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

coming soon
