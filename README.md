# broccoli-swiffer


A [Broccoli](https://github.com/broccolijs/broccoli) plugin which
uses [swiffer](https://github.com/smfoote/Swiffer.js) to lint
[Dust](https://github.com/linkedin/dustjs) templates.

## How to install?

```sh
$ npm install broccoli-swiffer --save-dev
```

## How to use?

In your `Brocfile.js`:

```js
var dustLint = require('broccoli-swiffer');
var outputTree = dustLint(inputTree, options);
```

### Options

* `extensions`: An array of file extensions to process, default `['tl', 'dust']`. 
* `throwOnError`: {boolean} cause exception error if linting fails
* `rules`: {Object} the rules that .swifferrc would contain

```js
var dustLint = require('broccoli-swiffer');
var outputTree = dustLint(inputTree, {
    extensions: ['dustjs'] // look for files.dustjs instead
    rules: [{
      name: 'it is a trap',
      description: 'stop using @bar',
      target: {
        type: '@',
        matches: 'bar'
      }
    }],
    // fail on lint error, but not in prod
    throwOnError: someAppThing.isProd ? false : true
});
```
