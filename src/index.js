const fs = require('fs');
const safeAssign = require('safe-assign');
const path = require('path');

// next packages
require('@jswork/next');
require('@jswork/next-baidu-fanyi');
require('@jswork/next-async-queue');
require('@jswork/next-list2map');

const defaults = {
  cwd: process.cwd(),
  input: 'original.json',
  output: 'dist',
  tab: 2,
  from: 'zh',
  to: [
    { key: 'en', value: 'en' },
    { key: 'zh', value: 'zh_CN' },
    { key: 'cht', value: 'zh_TW' }
  ],
  filter: (v) => v.data,
  apiOptions: null
};

module.exports = function(inOptions) {
  const options = nx.mix(null, defaults, inOptions);
  const input = path.join(options.cwd, options.input);
  const output = path.join(options.cwd, options.output);
  const keys = Object.keys(require(input));
  let initialized = false;

  if (!fs.existsSync(output)) {
    fs.mkdirSync(output);
    initialized = true;
  }

  const requests = options.to.map(item => {
    return {
      data: nx.mix(
        {
          q: keys.join('\n'),
          from: options.from,
          to: item.key,
          delay: 1200
        },
        options.apiOptions
      ),
      output: path.join(output, item.value + '.json')
    };
  });

  const items = requests.map(function(request) {
    return function(next) {
      return nx.BaiduFanyi.translate(request.data).then(function(res) {
        const filtered = options.filter({ data: res.trans_result, config: request });
        let old = null;
        if (!initialized && fs.existsSync(request.output)) {
          old = require(request.output);
        }
        const translated = nx.list2map(filtered, { key: 'src', value: 'dst' });
        const data = safeAssign(translated, old);
        const buffered = JSON.stringify(data, null, options.tab);
        fs.writeFileSync(request.output, buffered);
        next();
      });
    };
  });

  // start translate
  return nx.AsyncQueue.run(items);
};
