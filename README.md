# [gfynonce](https://burkes.github.io/gfynonce) - [![license](https://img.shields.io/github/license/Burkes/gfynonce.svg)](https://github.com/Burkes/gfynonce/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/gfynonce.svg)](https://npm.im/gfynonce) [![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/gfynonce.svg)](https://unpkg.com/gfynonce) [![Travis](https://img.shields.io/travis/Burkes/gfynonce.svg)](https://travis-ci.org/Burkes/gfynonce) ![node](https://img.shields.io/node/v/gfynonce.svg)

gfynonce is a "small" library that generates unique word compositions in the "adjective, adjective, animal" format that both Gfycat and Twitch uses. It tries it's best to generate nonces without repeating the same adjective and allows _some_ customization, such as providing the number of adjectives desired or the separator character.

## Installation and Usage

For your convenience, it is available in 3 forms, so choose whatever will work best for you:

### Command Line
Installing gfynonce for the command line is as simple as running the following command:
```
npm i -g gfynonce
```

Then, simply run `gfynonce` and it will generate a nonce with the default settings.
```
$ gfynonce
FatSmallAmericanBulldog
```
Additionally, you can provide some arguments to customize it, such as `--adjectives <number>` and `--separator <char>`.
```
$ gfynonce --adjectives 5 --separator .
Big.Small.Fancy.Elegant.Shy.Dipper
```

### Node
The installation procedure is almost the same, simply add it to your current project:
```
npm i --save gfynonce
```

And you should be good to import it!
```js
const gfynonce = require('gfynonce');

console.log(gfynonce({ adjectives: 1, separator: '_' }));
// Tiny_Hog
```

### Browser
Unpkg kindly provides a fast CDN for NPM packages which you can use to access the UMD script. 
```html
<script src="https://unpkg.com/gfynonce@latest/dist/gfynonce.min.js"></script>
<script>
  console.log(gfynonce());
  // HugeSmallArthropods
</script>
```