(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{194:function(e,t,o){"use strict";o.r(t);var n=o(136),r=o(343),d={components:{LayoutDefaultContainer:n.a,AtomResponsiveVideo:r.a},props:{options:{type:Object,default:function(){return null}},video:{type:Object,default:function(){return{poster:{sources:[{media:"default",srcset:"video/9_16/poster/412.jpg"},{media:"default",srcset:"video/9_16/poster/412.webp"},{media:"sm",srcset:"video/16_9/poster/768.jpg"},{media:"sm",srcset:"video/16_9/poster/768.webp"},{media:"md",srcset:"video/16_9/poster/992.jpg"},{media:"md",srcset:"video/16_9/poster/992.webp"},{media:"lg",srcset:"video/16_9/poster/1200.jpg"},{media:"lg",srcset:"video/16_9/poster/1200.webp"},{media:"xl",srcset:"video/16_9/poster/1600.jpg"},{media:"xl",srcset:"video/16_9/poster/1600.webp"}]}}}}}},l=(o(348),o(13)),component=Object(l.a)(d,(function(){var e=this.$createElement,t=this._self._c||e;return t("layout-default-container",this._b({staticClass:"organism-single-video"},"layout-default-container",this.options,!1),[t("template",{slot:"container"},[t("atom-responsive-video",this._b({},"atom-responsive-video",this.video,!1))],1)],2)}),[],!1,null,null,null);t.default=component.exports},280:function(e,t,o){"use strict";(function(e){o(66),o(16),o(8),o(54),o(189),o(287);var n=o(290),r={jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",webp:"image/webp"};t.a={props:{loading:{type:String,required:!1,default:function(){return"auto"}},sourceClientOnly:{type:Boolean,required:!1,default:function(){return!0}},placeholder:{type:String,required:!1,default:function(){return"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="}},sources:{type:[Array,Object],default:function(){return[{media:"default",srcset:"img/sample-a-16-9/412x232.jpg"},{media:"xs",srcset:"img/sample-a-16-9/768x432.jpg"},{media:"sm",srcset:"img/sample-a-16-9/992x558.jpg"},{media:"md",srcset:"img/sample-a-16-9/1200x675.jpg"},{media:"lg",srcset:"img/sample-a-16-9/1600x900.jpg"},{media:"xl",srcset:"img/sample-a-16-9/1920x1080.jpg"}]}},width:{type:Number,required:!1,default:function(){return null}},height:{type:Number,required:!1,default:function(){return null}},title:{type:String,required:!1,default:function(){return"image title"}},alt:{type:String,required:!1,default:function(){return"image description"}}},computed:{sorted:function(){return function(e,pattern){return e.sort((function(a,b){return pattern.indexOf(a.media)===pattern.indexOf(b.media)?0:pattern.indexOf(a.media)>pattern.indexOf(b.media)?1:-1}))}([].concat(this.sources),Array.from(n.a.keys())).reverse()},items:function(){var e=this;return this.sorted.map((function(source){var t;return(source=Object.assign({},source)).type="",e.sourceClientOnly,source.type=r[(t=source.srcset.replace(/.*\.(\w{3,4}).*$/,"$1"),/\w+$/.exec(t)[0])],source.media=n.a.get(source.media),source}))}},methods:{onLoad:function(){"objectFitImages"in e&&e.objectFitImages(this.$el.querySelector("img"))}}}}).call(this,o(26))},281:function(e,t,o){var content=o(293);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(53).default)("75eff58b",content,!0,{sourceMap:!1})},287:function(e,t,o){"use strict";var n=o(10),r=o(44),d=o(55),l=o(139),c=o(107),f=o(19),m=o(80).f,v=o(109).f,h=o(20).f,y=o(288).trim,x=n.Number,w=x,_=x.prototype,A="Number"==d(o(108)(_)),j="trim"in String.prototype,N=function(e){var t=c(e,!1);if("string"==typeof t&&t.length>2){var o,n,r,d=(t=j?t.trim():y(t,3)).charCodeAt(0);if(43===d||45===d){if(88===(o=t.charCodeAt(2))||120===o)return NaN}else if(48===d){switch(t.charCodeAt(1)){case 66:case 98:n=2,r=49;break;case 79:case 111:n=8,r=55;break;default:return+t}for(var code,l=t.slice(2),i=0,f=l.length;i<f;i++)if((code=l.charCodeAt(i))<48||code>r)return NaN;return parseInt(l,n)}}return+t};if(!x(" 0o1")||!x("0b1")||x("+0x1")){x=function(e){var t=arguments.length<1?0:e,o=this;return o instanceof x&&(A?f((function(){_.valueOf.call(o)})):"Number"!=d(o))?l(new w(N(t)),o,x):N(t)};for(var I,S=o(14)?m(w):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),E=0;S.length>E;E++)r(w,I=S[E])&&!r(x,I)&&h(x,I,v(w,I));x.prototype=_,_.constructor=x,o(21)(n,"Number",x)}},288:function(e,t,o){var n=o(11),r=o(43),d=o(19),l=o(289),c="["+l+"]",f=RegExp("^"+c+c+"*"),m=RegExp(c+c+"*$"),v=function(e,t,o){var r={},c=d((function(){return!!l[e]()||"​"!="​"[e]()})),f=r[e]=c?t(h):l[e];o&&(r[o]=f),n(n.P+n.F*c,"String",r)},h=v.trim=function(e,t){return e=String(r(e)),1&t&&(e=e.replace(f,"")),2&t&&(e=e.replace(m,"")),e};e.exports=v},289:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},290:function(e,t,o){"use strict";o(66),o(188),o(16),o(8),o(54),o(141);var n,r=o(291),d=new Map(Object.entries(r));t.a=(n=new Map,d.forEach((function(e,t){n.set(t.replace("--",""),e)})),n)},291:function(e){e.exports=JSON.parse('{"--default":"all","--default-max":"(max-width: 575px)","--xs":"(min-width: 576px)","--xs-max":"(max-width: 767px)","--sm":"(min-width: 768px)","--sm-max":"(max-width: 991px)","--md":"(min-width: 992px)","--md-max":"(max-width: 1199px)","--lg":"(min-width: 1200px)","--lg-max":"(max-width: 1599px)","--xl":"(min-width: 1600px)","--xl-max":"(max-width: 1919px)","--xxl":"(min-width: 1920px)"}')},292:function(e,t,o){"use strict";var n=o(281);o.n(n).a},293:function(e,t,o){(t=o(52)(!1)).push([e.i,"picture,picture img{display:block}picture img{width:100%;max-width:100%}",""]),e.exports=t},294:function(e,t){},295:function(e,t,o){"use strict";var n=o(280).a,r=(o(292),o(13)),d=o(294),l=o.n(d),component=Object(r.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("picture",{staticClass:"atom-responsive-image"},[e._l(e.items,(function(source,t){return o("source",e._b({key:t},"source",source,!1))})),e._v(" "),o("img",{attrs:{src:e.placeholder,alt:e.alt,title:e.title,loading:e.loading,width:e.width,height:e.height},on:{load:e.onLoad}})],2)}),[],!1,null,null,null);"function"==typeof l.a&&l()(component);t.a=component.exports},306:function(e,t,o){var content=o(332);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(53).default)("64bb2b2e",content,!0,{sourceMap:!1})},331:function(e,t,o){"use strict";var n=o(306);o.n(n).a},332:function(e,t,o){(t=o(52)(!1)).push([e.i,'.atom-responsive-video[data-v-f24e1146]{position:relative;background:#000}.atom-responsive-video[data-v-f24e1146]:before{display:block;padding-top:177.77778%;content:""}@media (min-width:576px){.atom-responsive-video[data-v-f24e1146]:before{padding-top:56.25%}}.atom-responsive-video video[data-v-f24e1146]{position:absolute;top:0;left:0;z-index:5;width:100%;height:100%}.atom-responsive-video .poster[data-v-f24e1146]{position:absolute;top:0;left:0;z-index:10;width:100%;height:100%}.atom-responsive-video .poster[data-v-f24e1146]:before{display:block;padding-top:177.77778%;content:""}@media (min-width:576px){.atom-responsive-video .poster[data-v-f24e1146]:before{padding-top:56.25%}}.atom-responsive-video .play-button[data-v-f24e1146],.atom-responsive-video .poster[data-v-f24e1146] img{position:absolute;top:0;left:0;width:100%}.atom-responsive-video .play-button[data-v-f24e1146]{z-index:11;height:100%;cursor:pointer}.atom-responsive-video .play-button i[data-v-f24e1146]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.atom-responsive-video .play-button i[data-v-f24e1146]:before{display:block;width:48px;height:48px;content:"";background:red;border-radius:50%}.atom-responsive-video.js--started .play-button[data-v-f24e1146],.atom-responsive-video.js--started .poster[data-v-f24e1146]{pointer-events:none;opacity:0}',""]),e.exports=t},333:function(e,t,o){var content=o(349);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(53).default)("603dfdb4",content,!0,{sourceMap:!1})},343:function(e,t,o){"use strict";var n={components:{AtomResponsiveImage:o(295).a},props:{poster:{type:Object,required:!1,default:function(){return{sources:[{media:"default",srcset:"video/9_16/poster/576.jpg"},{media:"xs",srcset:"video/16_9/poster/576.jpg"},{media:"sm",srcset:"video/16_9/poster/768.jpg"},{media:"md",srcset:"video/16_9/poster/992.jpg"},{media:"lg",srcset:"video/16_9/poster/1200.jpg"},{media:"xl",srcset:"video/16_9/poster/1600.jpg"}]}}},sources:{type:Array,required:!1,default:function(){return[{type:"video/mp4",src:"video/9_16/BigBuckBunny_9_16.mp4",media:"all and (max-width:575px)"},{type:"video/mp4",src:"video/16_9/BigBuckBunny_16_9.mp4",media:"all and (min-width:576px)"}]}},autoplay:{type:Boolean,required:!1,default:function(){return!1}},muted:{type:Boolean,required:!1,default:function(){return!1}},loop:{type:Boolean,required:!1,default:function(){return!1}},controls:{type:Boolean,required:!1,default:function(){return!0}},playsinline:{type:Boolean,required:!1,default:function(){return!1}},preload:{type:String,required:!1,default:function(){return"none"}}},data:function(){return{videoPlaying:!1,videoStarted:!1}},computed:{videoAttributes:function(){return{playsinline:this.playsinline,preload:this.preload,loop:this.loop,controls:this.controls,muted:this.muted}},styleClasses:function(){return{"js--started":this.videoStarted,"js--playing":this.videoPlaying}},filteredSources:function(){var e=this;return this.$isServer?[]:this.sources.filter((function(source){return e.isMedia(source.media)}))}},mounted:function(){var e=this;this.$nextTick((function(){e.autoplay&&e.$refs.video.play()}))},methods:{isMedia:function(e){return!!this.$isServer||e&&window.matchMedia(e).matches},onClickPlayButton:function(){this.$refs.video.play()},onPlay:function(){this.videoStarted=this.videoPlaying=!0},onPause:function(){this.videoPlaying=!1}}},r=(o(331),o(13)),component=Object(r.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"atom-responsive-video",class:e.styleClasses},[o("client-only",[o("video",e._b({ref:"video",on:{play:e.onPlay,pause:e.onPause}},"video",e.videoAttributes,!1),e._l(e.filteredSources,(function(source,t){return o("source",e._b({key:t},"source",source,!1))})),0)]),e._v(" "),o("atom-responsive-image",e._b({staticClass:"poster"},"atom-responsive-image",e.poster,!1)),e._v(" "),e.autoplay?e._e():o("span",{staticClass:"play-button",on:{click:e.onClickPlayButton}},[o("i")])],1)}),[],!1,null,"f24e1146",null);t.a=component.exports},348:function(e,t,o){"use strict";var n=o(333);o.n(n).a},349:function(e,t,o){(t=o(52)(!1)).push([e.i,"",""]),e.exports=t}}]);