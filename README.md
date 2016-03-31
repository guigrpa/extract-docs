# extract-docs [![Build Status](https://travis-ci.org/guigrpa/extract-docs.svg)](https://travis-ci.org/guigrpa/extract-docs) [![npm version](https://img.shields.io/npm/v/extract-docs.svg)](https://www.npmjs.com/package/extract-docs)

A simple CLI tool to gather documentation from JS code


## Installation

```
$ npm install --save extract-docs
```


## Usage

Use this tiny tool to extract comments from your JS code and insert them in a template. The template would look like this:

```
Bla bla bla...

[[[./lib/myLib.js]]]

Bla bla bla...
```

And your comments in `./lib/myLib.js` should look like this (note the `--` prefix):

```js
// -- ## foo()
// -- This documentation will be extracted.
export function foo() {
    // This will not appear in the extracted documentation
    // ...
}
```

Run the tool as follows:

```bash
$ extract-docs --template README_TEMPLATE.md --output README.md
```


## MIT license

Copyright (c) [Guillermo Grau Panea](https://github.com/guigrpa) 2016

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
