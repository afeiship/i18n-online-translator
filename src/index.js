var fs = require('fs');
var appRoot = require('app-root-path').path;
var safeAssign = require('safe-assign');
var path = require('path');

// next packages
require('@feizheng/next-js-core2');
require('@feizheng/next-baidu-fanyi');
require('@feizheng/next-queue');
require('@feizheng/next-list2map');

/* prettier-ignore */
var RETURN_VALUE = function(inValue) { return inValue.data; };
var DEFAULT_OPTIONS = {
  input: '/assets/locale/original.json',
  output: '/assets/locale/dist',
  tab: 2,
  from: 'zh',
  langs: {
    en: 'en',
    zh: 'zh_CN',
    cht: 'zh_TW'
  },
  filter: RETURN_VALUE,
  apiOptions: null
};

module.exports = function(inOptions) {
  var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
  var input = path.join(appRoot, options.input);
  var output = path.join(appRoot, options.output);
  var keys = Object.keys(require(input));
  var requests = [];
  var initialized = false;

  if (!fs.existsSync(output)) {
    fs.mkdirSync(output);
    initialized = true;
  }

  // requets
  nx.forIn(options.langs, function(key, value) {
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
      output: path.join(output, value + '.json')
    });
  });

  var items = requests.map(function(request) {
    return function(next) {
      return nx.BaiduFanyi.translate(request.data).then(function(res) {
        var filtered = options.filter({ data: res.trans_result, config: request });
        var old = !initialized ? require(request.output) : null;
        var translated = nx.list2map(filtered, { key: 'src', value: 'dst' });
        var data = safeAssign(translated, old);
        var buffered = JSON.stringify(data, null, options.tab);
        fs.writeFileSync(request.output, buffered);
        next();
      });
    };
  });

  // start translate
  return nx.Queue.run(items);
};
