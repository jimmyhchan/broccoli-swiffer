/*eslint-env node, mocha */
'use strict';

var expect = require('chai').expect;
var path = require('path');
var runDustLint = require('./testHelper');

var inputPath = path.join(__dirname, 'fixtures');

var allGood = path.join(inputPath, 'all_good');
var allBad = path.join(inputPath, 'all_bad');
// var customExt = path.join(inputPath, 'customExt');

var TEST_RESULTS = 'testResults';

var tests = [
  {
    name: 'all good',
    description: 'should find no lint errors',
    testPath: allGood,
    option: {}
  },
  {
    name: 'all bad',
    description: 'should find lint errors',
    testPath: allBad,
    option: {}
  }
];

function getExpectedResults(testPath) {
  return require(path.join(testPath, TEST_RESULTS));
};
describe('lint files using swiffer', function() {
  tests.forEach(function(t) {
    it(t.name + ' - ' + t.description, function () {
      var expectedResults = getExpectedResults(t.testPath);
      return runDustLint(t.testPath, {}).then(function(lintMessages) {
        expect(lintMessages).to.eql(expectedResults);
      });
    });
  });
});
