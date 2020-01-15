# i18next-online-scanner
> I18n-scanner + online translate.

## installation
```shell
npm install -S @feizheng/i18next-online-scanner
```

## options
| api        | type     | default                                 | description            |
| ---------- | -------- | --------------------------------------- | ---------------------- |
| input      | String   | /assets/locale/original.json            | Original file path     |
| ouput      | String   | /assets/locale/dist                     | Translated folder path |
| tab        | Number   | 2                                       | JSON format tab        |
| from       | String   | zh                                      | From which language    |
| langs      | Object   | { en: 'en', zh: 'zh_CN', cht: 'zh_TW' } | Translate to languages |
| filter     | Function | ({ data, config})=>{ return data;}      | Filter the result      |
| apiOptions | Object   | { appid:null, secret:null}              | Baidu fanyi opitons    |

## usage
```js
const i18nextOnlineScanner = require('@feizheng/i18next-online-scanner');

i18nextOnlineScanner({
  input: './examples/basic/assets/org.json',
  output: './examples/basic/assets/dist'
});
```

## results
```conf
.
├── assets
│   ├── dist
│   │   ├── en.json
│   │   ├── zh_CN.json
│   │   └── zh_TW.json
│   └── org.json
└── index.js
```
