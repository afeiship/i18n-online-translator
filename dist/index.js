/*!
 * name: @feizheng/i18next-online-scanner
 * url: https://github.com/afeiship/i18next-online-scanner
 * version: 1.0.0
 * license: MIT
 */

var fs=require("fs"),appRoot=require("app-root-path").path,safeAssign=require("safe-assign"),path=require("path");require("@feizheng/next-js-core2"),require("@feizheng/next-baidu-fanyi"),require("@feizheng/next-queue"),require("@feizheng/next-list2map");var RETURN_VALUE=function(e){return e.data},DEFAULT_OPTIONS={input:"/assets/locale/original.json",output:"/assets/locale/dist",tab:2,from:"zh",langs:{en:"en",zh:"zh_CN",cht:"zh_TW"},filter:RETURN_VALUE,engineOptions:null};module.exports=function(e){var o=nx.mix(null,DEFAULT_OPTIONS,e),n=path.join(appRoot,o.input),t=path.join(appRoot,o.output),i=Object.keys(require(n)),r=[],p=!1;fs.existsSync(t)||(fs.mkdirSync(t),p=!0),nx.forIn(o.langs,function(e,n){r.push({data:nx.mix({q:i.join("\n"),from:o.from,to:e,delay:1200},o.engineOptions),output:path.join(t,n+".json")})});var a=r.map(function(s){return function(u){return nx.BaiduFanyi.translate(s.data).then(function(e){var n=o.filter({data:e.trans_result,config:s}),t=p?null:require(s.output),i=nx.list2map(n,{key:"src",value:"dst"}),r=safeAssign(i,t),a=JSON.stringify(r,null,o.tab);fs.writeFileSync(s.output,a),u()})}});return nx.Queue.run(a)};