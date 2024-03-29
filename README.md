# i18n-online-translator
> I18n-scanner + online translate.

## installation
```shell
npm install -S @jswork/i18n-online-translator
```

## options
| api        | type     | default                                 | description                    |
|------------| -------- |-----------------------------------------| ------------------------------ |
| cwd        | String   | `process.cwd()`                         | The base path for input/output |
| input      | String   | /assets/locale/original.json            | Original file path             |
| ouput      | String   | /assets/locale/dist                     | Translated folder path         |
| tab        | Number   | 2                                       | JSON format tab                |
| from       | String   | zh                                      | From which language            |
| lang       | Object   | { en: 'en', zh: 'zh_CN', cht: 'zh_TW' } | Translate to languages         |
| filter     | Function | ({ data, config})=>{ return data;}      | Filter the result              |
| apiOptions | Object   | { appid:null, secret:null}              | Baidu fanyi opitons            |

## usage
```js
const i18nOnlineTranslator = require('@jswork/i18n-online-translator');

i18nOnlineTranslator({
  input: './examples/basic/assets/org.json',
  output: './examples/basic/assets/dist'
});
```

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
