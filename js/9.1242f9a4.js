(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{"3d1d":function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("pre",{domProps:{innerHTML:e._s(e.data)}})},p=[],r=(t("e6cf"),t("c973")),s=t.n(r),c={name:"MainLayout",components:{},data(){return{data:123,appId:"6b2a69e",appKey:"c87b11c9a340f6604cf737d2f6532cd"}},mounted(){this.callAPI().then(e=>{this.data=e}).catch(e=>{console.error(222,e)})},methods:{callAPI:function(){var e=s()((function*(){var e="https://api.schiphol.nl/wayfinding/poi/id/plaza";const a=new Headers;a.append("app_id",this.appId+"b"),a.append("app_key",this.appKey+"a");const t=yield fetch(e,{redirect:"manual",referrerPolicy:"origin",headers:a}).catch(e=>{console.error(111,e)});return t.json()}));return function(){return e.apply(this,arguments)}}(),callAPI2:function(e){return new Promise((a,t)=>{var n=new XMLHttpRequest;n.onreadystatechange=function(){n.readyState===XMLHttpRequest.DONE&&(200===n.status?a(n):(console.warn(n),t(n)))},e="https://api.schiphol.nl/wayfinding/poi/id/plaza",n.open("GET","https://api.schiphol.nl"+e,!0),n.setRequestHeader("app_id","6b2a69eb"),n.setRequestHeader("app_key","3fa88dcf9e3d8fe1bc5744c838db056a"),n.setRequestHeader("resourceVersion","v3"),n.setRequestHeader("Accept","application/json"),n.send()})}}},o=c,i=t("2877"),d=Object(i["a"])(o,n,p,!1,null,null,null);a["default"]=d.exports}}]);