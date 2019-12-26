var fs = require('fs');
var options = {
  debug: false,
  func: {
    list: ['i18n.t'],
    extensions: ['.js']
  },
  trans: null,
  lngs: ['en', 'zh_CN', 'zh_TW'],
  defaultLng: 'en',
  resource: {
    loadPath: 'dist/locale/{{lng}}.json',
    savePath: 'dist/locale/{{lng}}.json',
    jsonIndent: 2,
    lineEnding: '\n'
  },
  nsSeparator: false
};

module.exports = function() {
  var Parser = require('i18next-scanner').Parser;
  var parser = new Parser(options);
  var code = fs.readFileSync('./__tests__/app/component1.js');
  console.log('code', code);
  parser.parseFuncFromString(code);
  return parser.get();
};
