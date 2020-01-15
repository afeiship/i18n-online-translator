const i18nextOnlineScanner = require('../src');
var appRoot = require('app-root-path').path;

describe('Basic test', () => {
  test('test initialized:', (done) => {
    i18nextOnlineScanner({
      input: '__tests__/locale/original.json',
      output: '__tests__/locale/dist'
    }).then((res) => {
      expect(res).toEqual([]);
      done();
    });
  });
});
