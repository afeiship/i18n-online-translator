const i18nextOnlineScanner = require('../src');
const path = require('path');

jest.setTimeout(50 * 1000);

describe('Basic test', () => {
  test('test initialized:', (done) => {
    const cwd = path.join(process.cwd(), '__tests__/locale');
    i18nextOnlineScanner({
      cwd,
      input: 'original.json',
      output: 'dist'
    }).then((res) => {
      expect(res).toEqual([]);
      done();
    });
  });
});
