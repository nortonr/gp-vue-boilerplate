(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{1203:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(42),__webpack_require__(20),__webpack_require__(13),__webpack_require__(80);var LazyHydrate_esm=__webpack_require__(1212);var errorvue_type_script={props:{error:{type:Object,default:()=>({})}},data:()=>({components:[]}),computed:{dataComponents(){return[{component:"StagePicture",data:{picture:{sourceClientOnly:!1,sources:[{media:"default",srcset:"img/error.jpg"}]}}},{component:"Text",data:{article:{headline:{overline:null,headline:String(this.error.statusCode),subline:null},content:`<p>${this.error.message}</p>`}}}]}},created(){this.components=function getAsyncComponents(componentsData){var initialVisibleComponents=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1;return componentsData.map((function(item,index){var asyncLoad=function(){return __webpack_require__(1241)("./"+item.component)};return item.data.options=item.data.options||{},index>=initialVisibleComponents?{asyncComponent:Object(LazyHydrate_esm.c)(asyncLoad,{observerOptions:{rootMargin:"100px"}}),data:item.data}:(item.data.options=Object.assign(item.data.options,{visible:!0}),{asyncComponent:Object(LazyHydrate_esm.b)(asyncLoad),data:item.data})}))}(this.dataComponents)},head(){return{title:this.error.statusCode}}};__webpack_exports__.default=errorvue_type_script},1212:function(module,__webpack_exports__,__webpack_require__){"use strict";function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}__webpack_require__.d(__webpack_exports__,"a",(function(){return hydrateOnInteraction})),__webpack_require__.d(__webpack_exports__,"b",(function(){return hydrateWhenIdle})),__webpack_require__.d(__webpack_exports__,"c",(function(){return hydrateWhenVisible}));var observers=new Map;function createObserver(options){if("undefined"==typeof IntersectionObserver)return null;var optionKey=JSON.stringify(options);if(observers.has(optionKey))return observers.get(optionKey);var observer=new IntersectionObserver((function(entries){entries.forEach((function(entry){(entry.isIntersecting||entry.intersectionRatio>0)&&entry.target.hydrate&&entry.target.hydrate()}))}),options);return observers.set(optionKey,observer),observer}function loadingComponentFactory(resolvableComponent,options){return function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}({render:function render(h){var tag=this.$el?this.$el.tagName:"div";return this.$el||resolvableComponent._resolve(),h(tag)}},options)}function resolvableComponentFactory(component){var resolve,promise=new Promise((function(newResolve){resolve=newResolve}));return promise._resolve=function(){resolve("function"==typeof component?component():component)},promise}var isServer="undefined"==typeof window;function hydrateWhenIdle(component){var _ref=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},ignoredProps=_ref.ignoredProps;if(isServer)return component;var resolvableComponent=resolvableComponentFactory(component),loading=loadingComponentFactory(resolvableComponent,{props:ignoredProps,mounted:function mounted(){if("requestIdleCallback"in window&&"requestAnimationFrame"in window){var id=requestIdleCallback((function(){requestAnimationFrame(resolvableComponent._resolve)}),{timeout:this.idleTimeout});resolvableComponent.then((function cleanup(){return cancelIdleCallback(id)}))}else resolvableComponent._resolve()}});return function(){return{component:resolvableComponent,delay:0,loading:loading}}}function hydrateWhenVisible(component){var _ref2=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},ignoredProps=_ref2.ignoredProps,observerOptions=_ref2.observerOptions;if(isServer)return component;var resolvableComponent=resolvableComponentFactory(component),observer=createObserver(observerOptions),loading=loadingComponentFactory(resolvableComponent,{props:ignoredProps,mounted:function mounted(){var _this=this;if(observer){this.$el.hydrate=resolvableComponent._resolve;resolvableComponent.then((function cleanup(){return observer.unobserve(_this.$el)})),observer.observe(this.$el)}else resolvableComponent._resolve()}});return function(){return{component:resolvableComponent,delay:0,loading:loading}}}function hydrateOnInteraction(component){var _ref3=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},_ref3$event=_ref3.event,event=void 0===_ref3$event?"focus":_ref3$event,ignoredProps=_ref3.ignoredProps;if(isServer)return component;var resolvableComponent=resolvableComponentFactory(component),events=Array.isArray(event)?event:[event],loading=loadingComponentFactory(resolvableComponent,{props:ignoredProps,mounted:function mounted(){var _this2=this;events.forEach((function(eventName){_this2.$el.addEventListener(eventName,resolvableComponent._resolve,{capture:!0,once:!0})}))}});return function(){return{component:resolvableComponent,delay:0,loading:loading}}}Boolean,Boolean,Boolean,Boolean,Boolean},1241:function(module,exports,__webpack_require__){var map={"./SinglePicture":406,"./SinglePicture.vue":406,"./SingleVideo":407,"./SingleVideo.vue":407,"./StagePicture":408,"./StagePicture.vue":408,"./StageVideo":409,"./StageVideo.vue":409,"./Text":410,"./Text.vue":410,"./TextImage":411,"./TextImage.vue":411,"./article/HeadlineText":412,"./article/HeadlineText.vue":412};function webpackAsyncContext(req){return Promise.resolve().then((function(){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return __webpack_require__(map[req])}))}webpackAsyncContext.keys=function webpackAsyncContextKeys(){return Object.keys(map)},webpackAsyncContext.id=1241,module.exports=webpackAsyncContext}}]);
//# sourceMappingURL=9.ad22284ebdf3d3b0cb88.bundle.js.map