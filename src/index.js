var fs = require('fs');
var appRoot = require('app-root-path').path;
var safeAssign = require('safe-assign');
var path = require('path');

// next packages
require('@jswork/next');
require('@jswork/next-baidu-fanyi');
require('@jswork/next-async-queue');
require('@jswork/next-list2map');

/* prettier-ignore */
var RETURN_VALUE = function(inValue) {
  return inValue.data;
};
var defaults = {
  cwd: appRoot,
  input: 'original.json',
  output: 'dist',
  tab: 2,
  from: 'zh',
  lang: {
    en: 'en',
    zh: 'zh_CN',
    cht: 'zh_TW'
  },
  filter: RETURN_VALUE,
  apiOptions: null
};

module.exports = function(inOptions) {
  var options = nx.mix(null, defaults, inOptions);
  var input = path.join(options.cwd, options.input);
  var output = path.join(options.cwd, options.output);
  var keys = Object.keys(require(input));
  var requests = [];
  var initialized = false;

  if (!fs.existsSync(output)) {
    fs.mkdirSync(output);
    initialized = true;
  }

  // requets
  nx.forIn(options.lang, function(key, value) {
    var outputFile = path.join(output, value + '.json');
    requests.push({
      data: nx.mix(
        {
          q: keys.join('\n'),
          from: options.from,
          to: key,
          delay: 1200
        },
        options.apiOptions
      ),
      output: outputFile
    });
  });

  var items = requests.map(function(request) {
    return function(next) {
      return nx.BaiduFanyi.translate(request.data).then(function(res) {
        var filtered = options.filter({ data: res.trans_result, config: request });
        var old = null;
        if (!initialized && fs.existsSync(request.output)) {
          old = require(request.output);
        }
        var translated = nx.list2map(filtered, { key: 'src', value: 'dst' });
        var data = safeAssign(translated, old);
        var buffered = JSON.stringify(data, null, options.tab);
        fs.writeFileSync(request.output, buffered);
        next();
      });
    };
  });

  // start translate
  return nx.AsyncQueue.run(items);
};
