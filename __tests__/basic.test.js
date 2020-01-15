const i18nextOnlineScanner = require('../src');
var appRoot = require('app-root-path').path;

describe('Basic test', () => {
  test('test initialized:', (done) => {
    i18nextOnlineScanner({
      context: `${appRoot}/__tests__/locale`,
      input: 'original.json',
      output: 'dist'
    }).then((res) => {
      expect(res).toEqual([]);
      done();
    });
  });
});
