(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c3aa842a"],{"007b":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-contain",staticStyle:{"margin-top":"10px"}},[a("el-row",[a("label",[t._v("学科：")]),a("el-radio-group",{staticStyle:{"margin-left":"10px"},attrs:{size:"mini"},on:{change:t.subjectChange},model:{value:t.queryParam.subjectId,callback:function(e){t.$set(t.queryParam,"subjectId",e)},expression:"queryParam.subjectId"}},t._l(t.subjectList,(function(e){return a("el-radio",{key:e.id,attrs:{size:"mini",label:e.id}},[t._v(t._s(e.name))])})),1)],1),a("el-row",[a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{padding:"20px"}},t._l(t.tableData,(function(e){return a("el-card",{key:e.id,staticClass:"video-card"},[a("div",{staticStyle:{display:"flex","flex-direction":"column"}},[a("div",{staticStyle:{width:"380px",float:"left"}},[a("video-player",{ref:"videoPlayer",refInFor:!0,staticClass:"video-player vjs-custom-skin",staticStyle:{"object-fit":"fill"},attrs:{playsinline:!0,options:t.playerOption(e.src,e.poster)}})],1),a("label",{staticStyle:{"margin-top":"20px",padding:"0px 10px"}},[t._v(t._s(e.name))]),a("div",{staticStyle:{padding:"0px 10px",display:"flex","flex-direction":"row"}},[a("span",{staticStyle:{color:"#999",flex:"1","line-height":"36px","font-size":"13px"}},[t._v(t._s(e.examPaperName))]),a("router-link",{attrs:{target:"_blank",to:{path:"/do",query:{id:e.examPaperId}}}},[a("el-button",{staticClass:"button",attrs:{type:"text"}},[t._v("开始做题")])],1)],1)])])})),1)]),a("el-row",{staticStyle:{"text-align":"center"}},[a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],staticStyle:{"margin-top":"20px"},attrs:{total:t.total,background:!1,page:t.queryParam.pageIndex,limit:t.queryParam.pageSize},on:{"update:page":function(e){return t.$set(t.queryParam,"pageIndex",e)},"update:limit":function(e){return t.$set(t.queryParam,"pageSize",e)},pagination:t.search}})],1)],1)},i=[],r=(a("d3b7"),a("ac1f"),a("25f0"),a("841c"),a("333d")),o=a("b775"),u={pageList:function(t){return Object(o["a"])("/api/student/video/pageList",t)}},s=a("c418"),c={components:{Pagination:r["a"]},data:function(){return{queryParam:{subjectId:0,pageIndex:1,pageSize:10},listLoading:!1,subjectList:[],tableData:[],total:0}},created:function(){this.initSubject()},methods:{initSubject:function(){var t=this;s["a"].list().then((function(e){t.subjectList=e.response;var a=t.subjectList[0].id;t.queryParam.subjectId=a,t.tabId=a.toString(),t.search()}))},search:function(){var t=this;this.listLoading=!0,u.pageList(this.queryParam).then((function(e){var a=e.response;t.tableData=a.list,t.total=a.total,t.queryParam.pageIndex=a.pageNum,t.listLoading=!1}))},playerOption:function(t,e){return{playbackRates:[.7,1,1.5,2],autoplay:!1,muted:!1,loop:!1,preload:"none",language:"zh-CN",aspectRatio:"16:9",fluid:!0,sources:[{type:"video/mp4",src:t}],poster:e,notSupportedMessage:"此视频暂无法播放，请稍后再试",controlBar:{timeDivider:!0,durationDisplay:!0,remainingTimeDisplay:!1,fullscreenToggle:!0}}},subjectChange:function(t,e){this.search()}}},l=c,d=(a("f41f"),a("2877")),p=Object(d["a"])(l,n,i,!1,null,null,null);e["default"]=p.exports},"09f4":function(t,e,a){"use strict";a.d(e,"a",(function(){return o})),Math.easeInOutQuad=function(t,e,a,n){return t/=n/2,t<1?a/2*t*t+e:(t--,-a/2*(t*(t-2)-1)+e)};var n=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function i(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function r(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function o(t,e,a){var o=r(),u=t-o,s=20,c=0;e="undefined"===typeof e?500:e;var l=function t(){c+=s;var r=Math.easeInOutQuad(c,o,u,e);i(r),c<e?n(t):a&&"function"===typeof a&&a()};l()}},"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"218f":function(t,e,a){},"333d":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[a("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,"page-sizes":t.pageSizes,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},i=[],r=(a("a9e3"),a("09f4")),o={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:10},pageSizes:{type:Array,default:function(){return[5,10,20,30,50]}},layout:{type:String,default:"prev, pager, next"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&Object(r["a"])(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&Object(r["a"])(0,800)}}},u=o,s=(a("42cd"),a("2877")),c=Object(s["a"])(u,n,i,!1,null,"88181ce8",null);e["a"]=c.exports},"42cd":function(t,e,a){"use strict";var n=a("218f"),i=a.n(n);i.a},"841c":function(t,e,a){"use strict";var n=a("d784"),i=a("825a"),r=a("1d80"),o=a("129f"),u=a("14c3");n("search",1,(function(t,e,a){return[function(e){var a=r(this),n=void 0==e?void 0:e[t];return void 0!==n?n.call(e,a):new RegExp(e)[t](String(a))},function(t){var n=a(e,t,this);if(n.done)return n.value;var r=i(t),s=String(this),c=r.lastIndex;o(c,0)||(r.lastIndex=0);var l=u(r,s);return o(r.lastIndex,c)||(r.lastIndex=c),null===l?-1:l.index}]}))},a1f7:function(t,e,a){},f41f:function(t,e,a){"use strict";var n=a("a1f7"),i=a.n(n);i.a}}]);