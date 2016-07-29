'use strict';

var swiffer = require('swiffer');
var Filter = require('broccoli-persistent-filter');

var TL = 'tl';

DustLint.prototype = Object.create(Filter.prototype);
DustLint.prototype.constructor = DustLint;
function DustLint(inputTree, _options) {
  if (!(this instanceof DustLint)) {
    return new DustLint(inputTree, _options);
  }
  this.throwOnError = !!_options.throwOnError;
  this.formatter = typeof _options.formatter === 'function' ? _options.formatter : this._formatter;
  this.rules = _options.rules || [];

  var options = _options || {
  };

  Filter.call(this, inputTree, options);
  this.name = 'broccoli-swiffer';
}

DustLint.prototype.extensions = [TL];

DustLint.prototype.processString = function (content, relativePath) {
  var lintMessages = swiffer.clean(content, this.rules);
  // use the object with an output style of processString see @stefanpenner/broccoli-persistent-filter#50
  var out = {
    lintMessages: lintMessages,
    relativePath: relativePath,
    output: content
  };
  return out;
};
DustLint.prototype._formatter = function (fileName, results) {
  if (results) {
    results.forEach(function(r) {
      console.log(fileName + ' - ' + r);
    });
  }
};
// called after processString even if it is cached
DustLint.prototype.postProcess = function (fromCache) {
  var lintMessages = fromCache.lintMessages,
      relativePath = fromCache.relativePath,
      output = fromCache.output;

  if (lintMessages && lintMessages.length) {
    if (this.formatter) {
      this.formatter(relativePath, lintMessages);
    }
    if (this.throwOnError) {
      throw new Error('a linting error was found in your templates');
    }
  }
  // return output so that broccoli's output node === input node
  return {
    output: output
  };

};

module.exports = DustLint;
