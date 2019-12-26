var fs = require('fs');
var nx = require('@feizheng/next-js-core2');
var NxFangyi = require('@feizheng/next-baidu-fanyi');
var NxQueue = require('@feizheng/next-queue');
var sleep = require('sleep');
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

// module.exports = function() {
var Parser = require('i18next-scanner').Parser;
var parser = new Parser(options);
var code = fs.readFileSync('./__tests__/app/component1.js');
// console.log('code', code);
parser.parseFuncFromString(code);
var res = parser.get();
var SAP = '😀';
var enKeys = Object.keys(res.en.translation).join(SAP);
var cnKeys = Object.keys(res.zh_CN.translation).join(SAP);
var cntKeys = Object.keys(res.zh_TW.translation).join(SAP);

var reqs = [
  { q: enKeys, to: 'en' },
  { q: cntKeys, to: 'cht' }
];

var fns = reqs.map((req) => {
  return (done) => {
    sleep.sleep(1);
    NxFangyi.translate(req).then((res) => {
      done(res);
    });
  };
});

var nxQueue = new nx.Queue(fns);
nxQueue.start().then(({ status, data }) => {
  if (status === 'done') {
    console.log(JSON.stringify(data, null, 4));
  }
});
