(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b68a7adc"],{"09f4":function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),Math.easeInOutQuad=function(t,e,n,i){return t/=i/2,t<1?n/2*t*t+e:(t--,-n/2*(t*(t-2)-1)+e)};var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function a(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function s(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function r(t,e,n){var r=s(),o=t-r,c=20,l=0;e="undefined"===typeof e?500:e;var u=function t(){l+=c;var s=Math.easeInOutQuad(l,r,o,e);a(s),l<e?i(t):n&&"function"===typeof n&&n()};u()}},"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},2071:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{"line-height":"1.8"}},[1==t.qType?n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.qLoading,expression:"qLoading"}]},[n("div",{staticClass:"q-title",domProps:{innerHTML:t._s(t.question.title)}}),n("div",{staticClass:"q-content"},[n("el-radio-group",{attrs:{size:"medium"},on:{change:function(e){t.answer.completed=!0}},model:{value:t.answer.content,callback:function(e){t.$set(t.answer,"content",e)},expression:"answer.content"}},t._l(t.question.items,(function(e){return n("el-radio",{key:e.prefix,attrs:{label:e.prefix,size:"medium"}},[n("span",{staticClass:"question-prefix"},[t._v(t._s(e.prefix)+".")]),n("span",{staticClass:"q-item-span-content",domProps:{innerHTML:t._s(e.content)}})])})),1)],1)]):2==t.qType?n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.qLoading,expression:"qLoading"}]},[n("div",{staticClass:"q-title",domProps:{innerHTML:t._s(t.question.title)}}),n("div",{staticClass:"q-content"},[n("el-checkbox-group",{on:{change:function(e){t.answer.completed=!0}},model:{value:t.answer.contentArray,callback:function(e){t.$set(t.answer,"contentArray",e)},expression:"answer.contentArray"}},t._l(t.question.items,(function(e){return n("el-checkbox",{key:e.prefix,attrs:{label:e.prefix}},[n("span",{staticClass:"question-prefix"},[t._v(t._s(e.prefix)+".")]),n("span",{staticClass:"q-item-span-content",domProps:{innerHTML:t._s(e.content)}})])})),1)],1)]):3==t.qType?n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.qLoading,expression:"qLoading"}]},[n("div",{staticClass:"q-title",staticStyle:{display:"inline","margin-right":"10px"},domProps:{innerHTML:t._s(t.question.title)}}),n("span",{staticStyle:{"padding-right":"10px"}},[t._v("(")]),n("el-radio-group",{on:{change:function(e){t.answer.completed=!0}},model:{value:t.answer.content,callback:function(e){t.$set(t.answer,"content",e)},expression:"answer.content"}},t._l(t.question.items,(function(e){return n("el-radio",{key:e.prefix,attrs:{label:e.prefix}},[n("span",{staticClass:"q-item-span-content",domProps:{innerHTML:t._s(e.content)}})])})),1),n("span",{staticStyle:{"padding-left":"10px"}},[t._v(")")])],1):4==t.qType?n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.qLoading,expression:"qLoading"}]},[n("div",{staticClass:"q-title",domProps:{innerHTML:t._s(t.question.title)}}),n("div",t._l(t.question.items,(function(e){return n("el-form-item",{key:e.prefix,staticStyle:{"margin-top":"10px","margin-bottom":"10px"},attrs:{label:e.prefix,"label-width":"50px"}},[n("div",{staticClass:"edit-preview"},[n("div",{staticClass:"edit-preview-prefix"},[n("el-input",{staticClass:"editor-input",attrs:{placeholder:"填写答案"},on:{focus:function(n){return t.inputClick(t.answer.contentArray,e.prefix-1)},change:function(e){t.answer.completed=!0}},model:{value:t.answer.contentArray[e.prefix-1],callback:function(n){t.$set(t.answer.contentArray,e.prefix-1,n)},expression:"answer.contentArray[item.prefix-1]"}})],1),n("div",{staticClass:"edit-preview-content",domProps:{innerHTML:t._s(t.answer.contentArray[e.prefix-1])}})])])})),1)]):5==t.qType?n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.qLoading,expression:"qLoading"}]},[n("div",{staticClass:"q-title",domProps:{innerHTML:t._s(t.question.title)}}),n("div",{staticClass:"edit-preview",staticStyle:{padding:"10px 0"}},[n("div",{staticClass:"edit-preview-prefix"},[n("el-input",{staticClass:"editor-input",attrs:{placeholder:"填写答案"},on:{focus:function(e){return t.inputClick(t.answer,"content")},change:function(e){t.answer.completed=!0}},model:{value:t.answer.content,callback:function(e){t.$set(t.answer,"content",e)},expression:"answer.content"}})],1),n("div",{staticClass:"edit-preview-content",domProps:{innerHTML:t._s(t.answer.content)}})])]):n("div"),n("el-dialog",{staticStyle:{width:"100%",height:"100%"},attrs:{visible:t.richEditor.dialogVisible,"append-to-body":"","close-on-click-modal":!1,"show-close":!1,center:""},on:{"update:visible":function(e){return t.$set(t.richEditor,"dialogVisible",e)}}},[n("Ueditor",{on:{ready:t.editorReady}}),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:t.editorConfirm}},[t._v("确 定")]),n("el-button",{on:{click:function(e){t.richEditor.dialogVisible=!1}}},[t._v("取 消")])],1)],1)],1)},a=[],s=(n("a9e3"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("script",{staticStyle:{height:"300px"},attrs:{id:t.randomId,type:"text/plain"}})])}),r=[],o={name:"UE",props:{value:{default:function(){return""}}},data:function(){return{randomId:"editor_"+1e17*Math.random(),instance:null,ready:!1}},watch:{value:function(t,e){null!=t&&this.ready&&(this.instance=UE.getEditor(this.randomId),this.instance.setContent(t))}},mounted:function(){this.initEditor()},beforeDestroy:function(){null!==this.instance&&this.instance.destroy&&this.instance.destroy()},methods:{initEditor:function(){var t=this;this.$nextTick((function(){t.instance=UE.getEditor(t.randomId,{enterTag:"br"}),t.instance.addListener("ready",(function(){t.ready=!0,t.$emit("ready",t.instance)}))}))},getUEContent:function(){return this.instance.getContent()},setText:function(t){this.instance=UE.getEditor(this.randomId),this.instance.setContent(t)}}},c=o,l=n("2877"),u=Object(l["a"])(c,s,r,!1,null,null,null),d=u.exports,p={components:{Ueditor:d},name:"QuestionEdit",data:function(){return{richEditor:{dialogVisible:!1,object:null,parameterName:"",instance:null}}},props:{question:{type:Object,default:function(){return{}}},answer:{type:Object,default:function(){return{id:null,content:"",contentArray:[]}}},qLoading:{type:Boolean,default:!1},qType:{type:Number,default:0}},methods:{editorReady:function(t){this.richEditor.instance=t;var e=this.richEditor.object[this.richEditor.parameterName];null!==e&&void 0!==e&&this.richEditor.instance.setContent(e),this.richEditor.instance.focus()},inputClick:function(t,e){this.richEditor.object=t,this.richEditor.parameterName=e,this.richEditor.dialogVisible=!0},editorConfirm:function(){var t=this;this.richEditor.instance.getKfContent((function(){var e=t.richEditor.instance.getContent();t.richEditor.object[t.richEditor.parameterName]=e,t.richEditor.dialogVisible=!1}))}}},f=p,m=Object(l["a"])(f,i,a,!1,null,null,null);e["a"]=m.exports},"218f":function(t,e,n){},"30f5":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-contain",staticStyle:{"margin-top":"10px"}},[n("el-tabs",{attrs:{"tab-position":"left"},on:{"tab-click":t.subjectChange},model:{value:t.tabId,callback:function(e){t.tabId=e},expression:"tabId"}},t._l(t.subjectList,(function(e){return n("el-tab-pane",{key:e.id,staticStyle:{"margin-left":"20px"},attrs:{label:e.name,name:e.id}},[t._l(t.questions,(function(e,i){return n("el-card",{key:i,staticClass:"exam-question-item",staticStyle:{margin:"20px"},attrs:{label:i+1+".","label-width":"50px"}},[n("QuestionEdit",{attrs:{qType:e.questionType,question:e,answer:t.answerItems[t.startIndex+i]}}),t.showAnswer?n("div",{staticStyle:{"line-height":"1.8"}},[n("div",{staticClass:"question-answer-show-item",staticStyle:{"margin-top":"20px"}},[n("span",{staticClass:"question-show-item"},[t._v("难度：")]),n("el-rate",{staticClass:"question-show-item",attrs:{disabled:""},model:{value:e.difficult,callback:function(n){t.$set(e,"difficult",n)},expression:"questionItem.difficult"}})],1),n("br"),n("div",{staticClass:"question-answer-show-item",staticStyle:{"line-height":"1.8"}},[n("span",{staticClass:"question-show-item"},[t._v("解析：")]),n("span",{staticClass:"q-item-span-content",domProps:{innerHTML:t._s(e.analyze)}})]),n("div",{staticClass:"question-answer-show-item",staticStyle:{display:"flex"}},[n("span",{staticClass:"question-show-item"},[t._v("正确答案：")]),n("div",{staticStyle:{flex:"1"}},[1==e.questionType||2==e.questionType||5==e.questionType?n("span",{staticClass:"q-item-span-content",domProps:{innerHTML:t._s(e.correct)}}):t._e(),3==e.questionType?n("span",{staticClass:"q-item-span-content",domProps:{innerHTML:t._s(t.trueFalseFormatter(e))}}):t._e(),4==e.questionType?n("span",t._l(e.correctArray,(function(e){return n("div",{key:e,domProps:{innerHTML:t._s(e)}})})),0):t._e()])])]):t._e()],1)})),n("el-switch",{staticStyle:{float:"right","margin-right":"20px"},attrs:{"active-text":"显示答案","inactive-text":"隐藏答案"},model:{value:t.showAnswer,callback:function(e){t.showAnswer=e},expression:"showAnswer"}}),n("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],staticStyle:{"margin-top":"20px"},attrs:{total:t.total,background:!1,page:t.queryParam.pageIndex,limit:t.queryParam.pageSize,"page-sizes":[1,2,3,4],layout:"total, sizes, prev, pager, next, jumper"},on:{"update:page":function(e){return t.$set(t.queryParam,"pageIndex",e)},"update:limit":function(e){return t.$set(t.queryParam,"pageSize",e)},pagination:t.search}})],2)})),1)],1)},a=[],s=(n("a4d3"),n("4de4"),n("4160"),n("a9e3"),n("e439"),n("dbb4"),n("b64b"),n("d3b7"),n("ac1f"),n("25f0"),n("841c"),n("159b"),n("ade3")),r=n("2f62"),o=n("333d"),c=n("2071"),l=n("c418"),u=n("b775"),d={pageList:function(t){return Object(u["a"])("/api/student/question/page",t)}};function p(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?p(Object(n),!0).forEach((function(e){Object(s["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var m={components:{Pagination:o["a"],QuestionEdit:c["a"]},data:function(){return{queryParam:{subjectId:0,pageIndex:1,pageSize:2},tabId:"",listLoading:!1,subjectList:[],questions:[],answerItems:[],total:0,startIndex:0,showAnswer:!1}},created:function(){this.initSubject()},methods:{trueFalseFormatter:function(t){return t.items.filter((function(e){return e.prefix===t.correct}))[0].content},initSubject:function(){var t=this;l["a"].list().then((function(e){t.subjectList=e.response;var n=t.subjectList[0].id;t.queryParam.subjectId=n,t.tabId=n.toString(),t.search(),t.resetAnswer()}))},search:function(){var t=this;this.listLoading=!0,d.pageList(this.queryParam).then((function(e){var n=e.response;t.questions=n.list,t.total=n.total,t.startIndex=n.startRow-1,t.queryParam.pageIndex=n.pageNum,t.listLoading=!1}))},paperTypeChange:function(t){this.search()},resetAnswer:function(){this.answerItems=[];for(var t=0;t<this.total;t++)this.answerItems.push({content:null,contentArray:[],completed:!1})},subjectChange:function(t,e){this.queryParam.subjectId=Number(this.tabId),this.search(),this.resetAnswer()}},computed:f({},Object(r["e"])("enumItem",{paperTypeEnum:function(t){return t.exam.examPaper.paperTypeEnum}}))},h=m,g=n("2877"),v=Object(g["a"])(h,i,a,!1,null,null,null);e["default"]=v.exports},"333d":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[n("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,"page-sizes":t.pageSizes,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},a=[],s=(n("a9e3"),n("09f4")),r={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:10},pageSizes:{type:Array,default:function(){return[5,10,20,30,50]}},layout:{type:String,default:"prev, pager, next"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&Object(s["a"])(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&Object(s["a"])(0,800)}}},o=r,c=(n("42cd"),n("2877")),l=Object(c["a"])(o,i,a,!1,null,"88181ce8",null);e["a"]=l.exports},"42cd":function(t,e,n){"use strict";var i=n("218f"),a=n.n(i);a.a},"841c":function(t,e,n){"use strict";var i=n("d784"),a=n("825a"),s=n("1d80"),r=n("129f"),o=n("14c3");i("search",1,(function(t,e,n){return[function(e){var n=s(this),i=void 0==e?void 0:e[t];return void 0!==i?i.call(e,n):new RegExp(e)[t](String(n))},function(t){var i=n(e,t,this);if(i.done)return i.value;var s=a(t),c=String(this),l=s.lastIndex;r(l,0)||(s.lastIndex=0);var u=o(s,c);return r(s.lastIndex,l)||(s.lastIndex=l),null===u?-1:u.index}]}))}}]);