# i18next-online-scanner
> I18n-scanner + online translate.

## installation
```shell
npm install -S @feizheng/i18next-online-scanner
```

## options
| api           | type     | default                                 | description            |
| ------------- | -------- | --------------------------------------- | ---------------------- |
| input         | String   | /assets/locale/original.json            | original file path     |
| ouput         | String   | /assets/locale/dist                     | translated folder path |
| tab           | Number   | 2                                       | JSON format tab        |
| from          | String   | zh                                      | From which language    |
| langs         | Object   | { en: 'en', zh: 'zh_CN', cht: 'zh_TW' } | Translate to languages |
| filter        | Function | ({ data, config})=>{ return data;}      | Filter the result      |
| engineOptions | Object   | { appid:null, secret:null}              | Baidu fanyi opitons    |

## usage
```js
// codes
```
