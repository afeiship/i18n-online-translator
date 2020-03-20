/*!
 * name: @feizheng/i18n-online-translator
 * url: https://github.com/afeiship/i18n-online-translator
 * version: 1.2.1
 * license: MIT
 */

var fs=require("fs"),appRoot=require("app-root-path").path,safeAssign=require("safe-assign"),path=require("path");require("@feizheng/next-js-core2"),require("@feizheng/next-baidu-fanyi"),require("@feizheng/next-queue"),require("@feizheng/next-list2map");var RETURN_VALUE=function(n){return n.data},DEFAULT_OPTIONS={context:appRoot,input:"original.json",output:"dist",tab:2,from:"zh",lang:{en:"en",zh:"zh_CN",cht:"zh_TW"},filter:RETURN_VALUE,apiOptions:null};module.exports=function(n){var s=nx.mix(null,DEFAULT_OPTIONS,n),t=path.join(s.context,s.input),e=path.join(s.context,s.output),i=Object.keys(require(t)),r=[],p=!1;fs.existsSync(e)||(fs.mkdirSync(e),p=!0),nx.forIn(s.lang,function(n,t){r.push({data:nx.mix({q:i.join("\n"),from:s.from,to:n,delay:1200},s.apiOptions),output:path.join(e,t+".json")})});var u=r.map(function(o){return function(a){return nx.BaiduFanyi.translate(o.data).then(function(n){var t=s.filter({data:n.trans_result,config:o}),e=p?null:require(o.output),i=nx.list2map(t,{key:"src",value:"dst"}),r=safeAssign(i,e),u=JSON.stringify(r,null,s.tab);fs.writeFileSync(o.output,u),a()})}});return nx.Queue.run(u)};