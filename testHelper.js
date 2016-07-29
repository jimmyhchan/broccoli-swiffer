var broccoli = require('broccoli');
var DustLint = require('./index');


// run the broccoli build with the dustLint plugin
// but catch things in _formatter
module.exports = function runDustLint(inputNode, _options) {
  var options = _options || {};
  var lintMessages = [];
  var _oldFormatter = typeof _options.formatter === 'function' ? _options.formatter : DustLint.prototype._formatter;
  function spyFormatter(fileName, results) {
    var formattedResults = results.map(function(r) { return fileName + ' - ' + r; });
    lintMessages.push(formattedResults);
    _oldFormatter.call(this, [fileName, results]);
  }
  options.formatter = spyFormatter;
  var dustLint = new DustLint(inputNode, options);


  var builder = new broccoli.Builder(dustLint);

  return builder.build().then(function () {
    // put the results into the resolved
    return lintMessages;
  }).finally(function() {
    builder.cleanup();
  });
};
