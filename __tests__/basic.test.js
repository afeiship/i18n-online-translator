const i18nextOnlineScanner = require('../src');
var appRoot = require('app-root-path').path;

jest.setTimeout(50 * 1000);

describe('Basic test', () => {
  test('test initialized:', (done) => {
    i18nextOnlineScanner({
      cwd: `${appRoot}/__tests__/locale`,
      input: 'original.json',
      output: 'dist'
    }).then((res) => {
      expect(res).toEqual([]);
      done();
    });
  });
});
