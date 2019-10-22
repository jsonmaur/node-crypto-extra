# Crypto Extra Changelog

## v1.0

-   Removed manual type checking in favor of Typescript
-   Renamed `generateKey` to `randomKey`

## v0.4

-   BREAKING: Removed both Bcrypt methods (https://github.com/jsonmaur/node-crypto-extra/issues/1)
-   Bug fixes

## v0.3

-   Removed [npmjs.org/bcryptjs]() package in favor of [npmjs.org/bcrypt](), which relies on `node-gyp` for faster results.
-   Removed `.checksum` and `.checksumSync`. Use [this package](https://github.com/dshaw/checksum) instead.
-   Renamed `.bcrypt` to `.bcryptHash` to be more consistent.
-   Removed `.bcryptSync` and `.bcryptCompareSync` in favor of promised versions.
-   Added `length` option to `.generateKey`.

#### Removed Deprecations

-   `.decrypt` that was used before encryption IV was implemented.
-   Old version of `.random`.
-   Specifying `options.length` on `.randomString`.
-   Old consolidated version of `.bcrypt` that was hash and compare in one.
