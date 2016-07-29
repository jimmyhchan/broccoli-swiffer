/*eslint-env node, mocha */
'use strict';

var expect = require('chai').expect;
var path = require('path');
var runDustLint = require('./testHelper');

var inputPath = path.join(__dirname, 'fixtures');

var allGood = path.join(inputPath, 'all_good');
var allBad = path.join(inputPath, 'all_bad');
var customExt = path.join(inputPath, 'custom_extension');
var customRules = path.join(inputPath, 'custom_rules');
var nested = path.join(inputPath, 'nested');
var throwOnError = path.join(inputPath, 'throw_on_error');

var TEST_RESULTS = 'testResults';

var tests = [
  {
    name: 'all good',
    description: 'should find no lint errors',
    testPath: allGood,
    options: {}
  },
  {
    name: 'all bad',
    description: 'should find lint errors',
    testPath: allBad,
    options: {}
  },
  {
    name: 'custom extension',
    description: 'should find lint errors',
    testPath: customExt,
    options: {
      extensions: ['mytlext', 'tl']
    }
  },
  {
    name: 'custom rules',
    description: 'should use custom rules',
    testPath: customRules,
    options: {
      rules: require(path.join(customRules, 'swifferrc'))
    }
  },
  {
    name: 'nested',
    description: 'should look down the fixture path',
    testPath: nested,
    options: {
      rules: require(path.join(nested, 'swifferrc'))
    }
  },
  {
    name: 'throw on error',
    description: 'should throw',
    testPath: throwOnError,
    options: {
      throwOnError: true,
      onErrorMessageCaught: function(e) {
        expect(e.message).to.match(/throwOnError was specified/);
      }
    }
  }
];

function getExpectedResults(testPath) {
  return require(path.join(testPath, TEST_RESULTS));
};
describe('lint files using swiffer', function() {
  tests.forEach(function(t) {
    it(t.name + ' - ' + t.description, function () {
      var expectedResults = getExpectedResults(t.testPath);
      return runDustLint(t.testPath, t.options).then(function(lintMessages) {
        if (!t.options.throwOnError) {
          expect(lintMessages).to.eql(expectedResults);
        }
      });
    });
  });
});
