/*!
 * name: @jswork/i18n-online-translator
 * url: https://github.com/afeiship/i18n-online-translator
 * version: 1.0.1
 * license: MIT
 */

const fs=require("fs"),safeAssign=require("safe-assign"),path=require("path"),defaults=(require("@jswork/next"),require("@jswork/next-baidu-fanyi"),require("@jswork/next-async-queue"),require("@jswork/next-list2map"),{cwd:process.cwd(),input:"original.json",output:"dist",tab:2,from:"zh",to:[{key:"en",value:"en"},{key:"zh",value:"zh_CN"},{key:"cht",value:"zh_TW"}],filter:t=>t.data,apiOptions:null});module.exports=function(t){const s=nx.mix(null,defaults,t);t=path.join(s.cwd,s.input);const e=path.join(s.cwd,s.output),n=Object.keys(require(t));let i=!1;fs.existsSync(e)||(fs.mkdirSync(e),i=!0);const u=s.to.map(t=>({data:nx.mix({q:n.join("\n"),from:s.from,to:t.key,delay:1200},s.apiOptions),output:path.join(e,t.value+".json")}));t=u.map(function(u){return function(n){return nx.BaiduFanyi.translate(u.data).then(function(t){t=s.filter({data:t.trans_result,config:u});let e=null;!i&&fs.existsSync(u.output)&&(e=require(u.output));t=nx.list2map(t,{key:"src",value:"dst"}),t=safeAssign(t,e),t=JSON.stringify(t,null,s.tab);fs.writeFileSync(u.output,t),n()})}});return nx.AsyncQueue.run(t)};