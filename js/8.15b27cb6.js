(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"41a1":function(t,e,o){},"713b":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t._self._c;return e("q-layout",{attrs:{view:"hHh Lpr lFf",id:"geodev"},on:{scroll:t.checkScroll}},[e("q-header",{staticClass:"row wrap justify-center items-start content-start",class:t.hitTop?"hittop":"",attrs:{elevated:""}},[e("q-toolbar",[e("q-tabs",{staticClass:"q-mx-xl",staticStyle:{width:"100vw"},attrs:{"no-caps":"","outside-arrows":"","mobile-arrows":""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[e("q-tab",{attrs:{id:"header-title",name:"geodev"},on:{click:function(e){return t.scrollToElement("body")}}},[t._v("GeoDev\n        ")]),e("q-space"),e("q-tab",{staticClass:"gt-xs",attrs:{name:"services",label:"Services"},on:{click:function(e){return t.scrollToElement("#services")}}}),e("q-tab",{staticClass:"gt-xs",attrs:{name:"portfolio",label:"Portfolio"},on:{click:function(e){return t.scrollToElement("#portfolio")}}}),e("q-tab",{staticClass:"gt-xs",attrs:{name:"about",label:"About"},on:{click:function(e){return t.scrollToElement("#about")}}}),e("q-tab",{staticClass:"gt-xs",attrs:{name:"contact",label:"Contact"},on:{click:function(e){return t.scrollToElement("#contact")}}})],1)],1)],1),e("router-view")],1)},c=[],l=(o("caad"),o("0831"));const{getScrollTarget:s,setScrollPosition:n}=l["a"];var r={name:"MainLayout",components:{},data(){return{hitTop:!0,tab:"geodev",leftDrawerOpen:!1}},methods:{scrollToElement(t){const e=1e3,o=document.querySelectorAll(t)[0],a=s(o),c=o.offsetTop-120;n(a,c,e)},checkScroll(t){this.hitTop=t.position<150,Array.prototype.slice.call(document.querySelectorAll("section")).filter((t=>["geodev","services","portfolio","about","contact"].includes(t.id))).filter((e=>{var o=e.getBoundingClientRect();return o.top<0&&o.top+o.height>150||o.top>0&&o.top<100||o.top<600&&"contact"===e.id||t.position<100&&"geodev"===e.id})).map((t=>{this.tab=t.id}))}}},i=r,u=(o("9975"),o("2877")),b=o("4d5a"),p=o("e359"),d=o("65c6"),f=o("429b"),m=o("7460"),v=o("2c91"),h=o("b498"),w=o("eebe"),g=o.n(w),T=Object(u["a"])(i,a,c,!1,null,"bcec8cfa",null);e["default"]=T.exports;g()(T,"components",{QLayout:b["a"],QHeader:p["a"],QToolbar:d["a"],QTabs:f["a"],QTab:m["a"],QSpace:v["a"],QColor:h["a"]})},9975:function(t,e,o){"use strict";o("41a1")}}]);