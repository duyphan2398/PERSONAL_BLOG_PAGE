webpackJsonp([2,11,22],{"7EcI":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("2vhu"),a=e("u4Bf"),o=e.n(a),s=e("+4Zy"),r={name:"MovieList",props:{headerTitle:{type:String,default:""},isLoading:{type:Boolean,default:!1},movies:Array,paginator:{perPage:Number,currentPage:Number,total:Number}},components:{Pagination:i.i,draggable:o.a},computed:{},methods:{onPageChange:function(n,t){this.$emit("onDataChange",{page:n,pageSize:t})},onAddEvent:function(n){var t=Object(s.c)(this.movies,function(t){return t.id===n.item.getAttribute("data-id")});-1!==t&&this.movies.splice(t,1)}}},c=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{attrs:{id:"file-list"}},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-status-top bg-warning"}),n._v(" "),e("div",{staticClass:"card-header pb-4 pt-4"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-12 col-md-7 d-flex align-items-center"},[n.headerTitle?e("b",{domProps:{textContent:n._s(n.headerTitle)}}):n._e()]),n._v(" "),e("div",{staticClass:"col-12 col-md-5"},[n._t("headerRight")],2)])]),n._v(" "),e("div",{staticClass:"card-body position-relative card-body-style"},[n.isLoading?e("div",{staticClass:"position-absolute w-100 h-100 spin"},[e("a-spin")],1):e("div",{staticClass:"row"},[e("draggable",n._b({staticClass:"col-12 d-flex flex-row flex-wrap",staticStyle:{"min-height":"320px"},attrs:{"ghost-class":"ghost-movie",list:n.movies,tag:"div"},on:{add:function(t){return n.onAddEvent(t)}}},"draggable",{group:{name:"movie",pull:"clone"}},!1),n._l(n.movies,function(t,i){return e("a-card",{key:i,staticClass:"custom-card-image",attrs:{bordered:!1,headStyle:{minHeight:"30px",padding:0},bodyStyle:{padding:"10px 5px"},"data-id":t.id}},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.movie_thumbnail,expression:"movie.movie_thumbnail"}],staticStyle:{width:"100%",height:"150px","object-fit":"cover"},attrs:{slot:"cover",title:t.movie_title,alt:t.movie_title},slot:"cover"}),n._v(" "),e("a-card-meta",{attrs:{title:t.movie_title}})],1)}),1)],1)]),n._v(" "),e("div",{staticClass:"card-footer text-center p-0"},[e("a-pagination",{attrs:{"default-current":n.paginator.currentPage,current:n.paginator.currentPage,pageSize:n.paginator.perPage,total:n.paginator.total,"show-less-items":""},on:{change:n.onPageChange}})],1)])])};c._withStripped=!0;var u={render:c,staticRenderFns:[]},l=u;var p=!1;var d=e("VU/8")(r,l,!1,function(n){p||e("Rq3j")},"data-v-cb7e8dd0",null);d.options.__file="src/pages/movie/components/MovieList.vue";t.default=d.exports},"8kBa":function(n,t,e){(n.exports=e("FZ+f")(!0)).push([n.i,"\n#file-list[data-v-cb7e8dd0]{position:-webkit-sticky;position:sticky;top:80px\n}\n.card-body-style[data-v-cb7e8dd0]{max-height:320px;min-height:320px;overflow-y:scroll\n}\n.spin[data-v-cb7e8dd0]{left:0;top:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;z-index:2;background:#ffffff85\n}\n.card .card-header[data-v-cb7e8dd0]{display:-webkit-box;display:-ms-flexbox;display:flex\n}\n.card .card-header h3[data-v-cb7e8dd0]{width:50%\n}\n.card-footer[data-v-cb7e8dd0] .ant-pagination{margin:5px 20px !important\n}\n","",{version:3,sources:["C:/laragon/www/PERSONAL_BLOG_PAGE/src/pages/movie/components/C:/laragon/www/PERSONAL_BLOG_PAGE/src/pages/movie/components/MovieList.vue"],names:[],mappings:";AAAA,4BAAW,wBAAwB,gBAAgB,QAAQ;CAAC;AAAA,kCAAiB,iBAAiB,iBAAiB,iBAAiB;CAAC;AAAA,uBAAM,OAAO,MAAM,oBAAA,oBAAA,aAAa,yBAAA,sBAAA,mBAAmB,wBAAA,qBAAA,uBAAuB,UAAU,oBAAoB;CAAC;AAAA,oCAAmB,oBAAA,oBAAA,YAAY;CAAC;AAAA,uCAAsB,SAAS;CAAC;AAAA,8CAAoC,0BAA0B;CAAE",file:"MovieList.vue",sourcesContent:["#file-list{position:-webkit-sticky;position:sticky;top:80px}.card-body-style{max-height:320px;min-height:320px;overflow-y:scroll}.spin{left:0;top:0;display:flex;align-items:center;justify-content:center;z-index:2;background:#ffffff85}.card .card-header{display:flex}.card .card-header h3{width:50%}.card-footer /deep/ .ant-pagination{margin:5px 20px !important}\n"],sourceRoot:""}])},B4cf:function(n,t,e){(n.exports=e("FZ+f")(!0)).push([n.i,"\n.card-common.isHideBody .ant-card-body[data-v-7533ab38]{display:none !important\n}\n","",{version:3,sources:["C:/laragon/www/PERSONAL_BLOG_PAGE/src/pages/movie/components/C:/laragon/www/PERSONAL_BLOG_PAGE/src/pages/movie/components/MovieGroupComponent.vue"],names:[],mappings:";AAqFA,wDACE,uBACF;CAAC",file:"MovieGroupComponent.vue",sourcesContent:["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n.card-common.isHideBody .ant-card-body {\r\n  display: none !important\r\n}\r\n"],sourceRoot:""}])},"E+Ku":function(n,t,e){"use strict";var i=e("Gu7T"),a=e.n(i),o=e("Zx67"),s=e.n(o),r=e("Zrlr"),c=e.n(r),u=e("wxAW"),l=e.n(u),p=e("zwoO"),d=e.n(p),v=e("Pf15"),m=e.n(v),f=function(n){function t(){return c()(this,t),d()(this,(t.__proto__||s()(t)).apply(this,arguments))}return m()(t,n),l()(t,[{key:"buildUrl",value:function(n){var t=n.params;return["movies"].concat(a()(t))}}]),t}(e("ehip").a);t.a=f},MdHD:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("woOf"),a=e.n(i),o=e("Gu7T"),s=e.n(o),r=e("Dd8w"),c=e.n(r),u=e("Xxa5"),l=e.n(u),p=e("exGp"),d=e.n(p),v=e("Jpv8"),m=e("Ph1o"),f=e("+4Zy"),g=e("u4Bf"),h=e.n(g),b={group_name:"",top_content:!1,is_active:!0,movies:[],isVisible:!0},_=e("zMT7"),A=e("7EcI"),x=e("Vwn4"),y=e("J5s8"),C=e("E+Ku"),w=e("Zx67"),G=e.n(w),k=e("Zrlr"),B=e.n(k),L=e("wxAW"),S=e.n(L),M=e("zwoO"),E=e.n(M),P=e("Pf15"),O=e.n(P),I=function(n){function t(){return B()(this,t),E()(this,(t.__proto__||G()(t)).apply(this,arguments))}return O()(t,n),S()(t,[{key:"buildUrl",value:function(n){var t=n.params;return["movie-groups"].concat(s()(t))}}],[{key:"updateMovieGroups",value:function(n){return(new this).request({method:"POST",url:"movie-groups",data:n,isStatic:!0})}},{key:"deleteMovieGroup",value:function(n){return(new this).request({method:"DELETE",url:"movie-groups/"+n,isStatic:!0})}}]),t}(e("ehip").a),j={name:"Index",mixins:[m.a],data:function(){return{drag:!1,movieGroupsList:[],isLoading:!1,list:[],pagination:{},filter:{movie_title:""},isSubmit:!1,perPage:""}},computed:{dragOptions:function(){return{group:"movieGroup",animation:100,disabled:!1,ghostClass:"ghost-movie-group",forceFallback:!0,scroll:!0,bubbleScroll:!0}}},components:{InputText:y.a,InputSwitch:x.a,MovieList:A.default,MovieGroupComponent:_.default,draggable:h.a,EditIcon:v.d,Trash2Icon:v.s,MoreVerticalIcon:v.j,PlusCircleIcon:v.k,MinusCircleIcon:v.i,XCircleIcon:v.w,PlusIcon:v.l},beforeRouteEnter:function(n,t,e){var i=this;return d()(l.a.mark(function t(){var a,o;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C.a.paginate({query:{page:1,per_page:12,"sortBy[updated_at]":"desc"}});case 2:return a=t.sent,t.next=5,I.paginate({query:{per_page:0,include:"movies","sortBy[position]":"asc"}});case 5:return o=t.sent,n.meta.list=a.data,o.data.forEach(function(n){n.isVisible=!0}),n.meta.movie_groups_list=o.data,n.meta.pagination=a.pagination,t.abrupt("return",e());case 11:case"end":return t.stop()}},t,i)}))()},created:function(){this.movieGroupsList=this.$route.meta.movie_groups_list,this.list=this.$route.meta.list,this.pagination=this.$route.meta.pagination,this.perPage=this.pagination.perPage},methods:{changeVisible:function(n){n.isVisible=!n.isVisible},addMovieGroup:function(){this.movieGroupsList.push(Object(f.a)(b))},deleteMovieGroup:function(n,t){var e=this;return d()(l.a.mark(function i(){return l.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if(!n.id){i.next=3;break}return i.next=3,I.deleteMovieGroup(n.id);case 3:return e.movieGroupsList.splice(t,1),i.next=6,e.onSuccess(e.$t("message_success"),e.$t("delete_message_successfully"));case 6:case"end":return i.stop()}},i,e)}))()},onDataChange:function(n){var t=this;return d()(l.a.mark(function e(){var i;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.perPage=n.pageSize,i={page:n.page,per_page:n.pageSize},e.abrupt("return",t.fetchMedia(i));case 3:case"end":return e.stop()}},e,t)}))()},onSwitch:function(n,t){t&&Object(f.d)(this.movieGroupsList,function(t,e){e!==n&&(t.top_content=!1)})},onSearch:function(n){var t=this;return d()(l.a.mark(function n(){return l.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.fetchMedia({page:1,per_page:t.perPage});case 2:case"end":return n.stop()}},n,t)}))()},fetchMedia:function(){var n=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return d()(l.a.mark(function e(){var i,a,o;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:for(a in n.isLoading=!0,i={},n.filter)i["filters["+a+"]"]=n.filter[a];return e.prev=3,e.next=6,C.a.paginate({query:c()({},t,i,{"sortBy[updated_at]":"desc"})});case 6:o=e.sent,n.list=[].concat(s()(o.data)),n.pagination=c()({},o.pagination),n.isLoading=!1,e.next=15;break;case 12:e.prev=12,e.t0=e.catch(3),n.isLoading=!1;case 15:case"end":return e.stop()}},e,n,[[3,12]])}))()},validateBeforeSubmit:function(){var n=this;return d()(l.a.mark(function t(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.$refs.observer.validate();case 2:if(!t.sent){t.next=6;break}return t.next=6,n.saveMovieGroupList();case 6:case"end":return t.stop()}},t,n)}))()},saveMovieGroupList:function(){var n=this;return d()(l.a.mark(function t(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n.isSubmit=!0,n.movieGroupsList.forEach(function(n,t){n.position=t}),t.next=5,I.updateMovieGroups(n.movieGroupsList);case 5:return t.sent.data.forEach(function(t,e){n.movieGroupsList[e]=a()(n.movieGroupsList[e],c()({},t))}),t.next=9,n.onSuccess(n.$t("message_success"),n.$t("update_message_successfully"));case 9:t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),n.checkErrorsAPI(t.t0);case 14:n.isSubmit=!1;case 15:case"end":return t.stop()}},t,n,[[0,11]])}))()},checkErrorsAPI:function(n){var t=this;Object(f.d)(n.response.data.errors,function(n){Object(f.l)(t.$refs.observer.errors,function(t,e){if(n.field.includes(e))if(n.field.includes("group_name")){var i=n.message.split("group_name")[1];t.push(Object(f.n)(i,2,i.length).join(""))}else t.push(n.message)})})}}},$=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"container"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-6"},[e("ValidationObserver",{ref:"observer",attrs:{tag:"form"},on:{submit:function(t){return t.preventDefault(),n.validateBeforeSubmit(t)}}},[e("draggable",n._b({attrs:{handle:".btn_handle"},on:{start:function(t){n.drag=!0},end:function(t){n.drag=!1}},model:{value:n.movieGroupsList,callback:function(t){n.movieGroupsList=t},expression:"movieGroupsList"}},"draggable",n.dragOptions,!1),[e("transition-group",{attrs:{type:"transition",name:n.drag?null:"flip-list"}},[n._l(n.movieGroupsList,function(t,i){return[e("MovieGroupComponent",{key:i,attrs:{value:i},scopedSlots:n._u([{key:"isVisible",fn:function(){return[e("button",{staticClass:"btn btn-link p-0 ml-1",attrs:{type:"button"},on:{click:function(e){return n.changeVisible(t)}}},[t.isVisible?e("MinusCircleIcon",{attrs:{size:"22"}}):e("PlusCircleIcon",{attrs:{size:"22"}})],1),n._v(" "),n.hasPermissionAction(n.PERMISSIONS.DELETE_MOVIE_GROUP)?[e("span",[n._v("|")]),n._v(" "),e("a-popconfirm",{attrs:{title:n.$t("confirm_delete_content"),"ok-text":n.$t("confirm_yes"),"cancel-text":n.$t("confirm_no")},on:{confirm:function(e){return n.deleteMovieGroup(t,i)}}},[e("button",{staticClass:"btn btn-link p-0",attrs:{type:"button"}},[e("XCircleIcon",{staticClass:"text-danger",attrs:{size:"22"}})],1)])]:n._e()]},proxy:!0},{key:"headerMovieGroup",fn:function(){return[e("div",{staticClass:"col-12 col-md-1 d-flex justify-content-center"},[e("button",{staticClass:"btn btn-link p-0 btn_handle",attrs:{type:"button"}},[e("MoreVerticalIcon",{attrs:{size:"20"}})],1)]),n._v(" "),e("div",{staticClass:"col-12 col-md-5"},[e("InputText",{attrs:{rules:"required|max:255",vid:i+".group_name",label:"field_movie_group_name","hidden-label":!0},model:{value:n.movieGroupsList[i].group_name,callback:function(t){n.$set(n.movieGroupsList[i],"group_name",t)},expression:"movieGroupsList[index].group_name"}})],1),n._v(" "),e("div",{staticClass:"col-12 col-md-5 align-self-center "},[e("InputSwitch",{staticClass:"justify-content-center",attrs:{label:"status_movie",vertical:!0},on:{input:function(t){return n.onSwitch(i,t)}},model:{value:n.movieGroupsList[i].top_content,callback:function(t){n.$set(n.movieGroupsList[i],"top_content",t)},expression:"movieGroupsList[index].top_content"}})],1)]},proxy:!0}],null,!0),model:{value:n.movieGroupsList[i],callback:function(t){n.$set(n.movieGroupsList,i,t)},expression:"movieGroupsList[index]"}})]})],2)],1),n._v(" "),e("div",{staticClass:"card-footer fixed-bottom bg-light shadow"},[n.hasPermissionAction(n.PERMISSIONS.VIEW_MOVIE)?e("button",{staticClass:"btn btn-success float-right mr-1",class:{"btn-loading disabled":n.isSubmit},attrs:{type:"submit"}},[e("a-icon",{staticClass:"mr-1",attrs:{type:"save"}}),n._v("\n              "+n._s(n.$t("btn_save"))+"\n            ")],1):n._e()])],1),n._v(" "),e("div",{staticClass:"text-center"},[e("button",{staticClass:"btn btn-link",attrs:{type:"primary"},on:{click:n.addMovieGroup}},[e("PlusIcon",{staticClass:"mr-1",attrs:{size:"16"}}),n._v("\n          "+n._s(n.$t("btn_add_more_movie_group"))+"\n        ")],1)])],1),n._v(" "),e("div",{staticClass:"col-6"},[e("MovieList",{attrs:{movies:n.list,"is-loading":n.isLoading,paginator:n.pagination,"header-title":n.$t("movie_list")},on:{onDataChange:function(t){return n.onDataChange(t)}},scopedSlots:n._u([{key:"headerRight",fn:function(){return[e("a-input-search",{attrs:{placeholder:n.$t("placeholder_filter_movie_name")},on:{search:n.onSearch},model:{value:n.filter.movie_title,callback:function(t){n.$set(n.filter,"movie_title",t)},expression:"filter.movie_title"}})]},proxy:!0}])})],1)])])};$._withStripped=!0;var V={render:$,staticRenderFns:[]},R=V;var z=!1;var T=e("VU/8")(j,R,!1,function(n){z||e("uhTY")},"data-v-9921be82",null);T.options.__file="src/pages/movie/Index.vue";t.default=T.exports},MqV3:function(n,t,e){(n.exports=e("FZ+f")(!0)).push([n.i,"\n.btn_handle[data-v-9921be82]{cursor:move\n}\n","",{version:3,sources:["C:/laragon/www/PERSONAL_BLOG_PAGE/src/pages/movie/C:/laragon/www/PERSONAL_BLOG_PAGE/src/pages/movie/Index.vue"],names:[],mappings:";AAiTA,6BACE,WAAY;CACb",file:"Index.vue",sourcesContent:["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.btn_handle{\n  cursor: move;\n}\n"],sourceRoot:""}])},Rq3j:function(n,t,e){var i=e("8kBa");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("rjj0")("8caaecc2",i,!1,{})},mIQF:function(n,t,e){var i=e("B4cf");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("rjj0")("7e160b65",i,!1,{})},uhTY:function(n,t,e){var i=e("MqV3");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("rjj0")("5a032e56",i,!1,{})},zMT7:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("u4Bf"),a=e.n(i),o=e("+4Zy"),s={name:"MovieGroupComponent",model:{prop:"movieGroup",event:"change"},props:{movieGroup:{type:[String,Object],default:null},value:{type:Number,default:0}},components:{draggable:a.a},data:function(){return{data:null}},methods:{onAddEvent:function(n){this.movieGroup.movies=Object(o.o)(this.movieGroup.movies,"id")}}},r=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("a-card",{staticClass:"card-common",class:{isHideBody:!n.movieGroup.isVisible}},[e("template",{slot:"extra"},[n._t("isVisible")],2),n._v(" "),e("div",{staticClass:"title mt-1",attrs:{slot:"title"},slot:"title"},[e("div",{staticClass:"card-status-top",class:{"bg-success":n.movieGroup.top_content,"bg-warning":!n.movieGroup.top_content}}),n._v(" "),e("div",{staticClass:"row"},[n._t("headerMovieGroup")],2)]),n._v(" "),e("div",{staticClass:"row card-content",staticStyle:{"max-height":"320px","min-height":"200px","overflow-y":"scroll"}},[e("draggable",{staticClass:"col-12 d-flex flex-row flex-wrap",attrs:{list:n.movieGroup.movies,"ghost-class":"ghost-movie",group:"movie",tag:"div"},on:{add:function(t){return n.onAddEvent(t)}}},n._l(n.movieGroup.movies,function(t,i){return e("a-card",{key:t.id+i,staticClass:"custom-card-image",attrs:{bordered:!1,headStyle:{minHeight:"30px",padding:0},bodyStyle:{padding:"10px 5px"},"data-id":t.id}},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.movie_thumbnail,expression:"movie.movie_thumbnail"}],staticStyle:{width:"100%",height:"150px","object-fit":"cover"},attrs:{slot:"cover",title:t.movie_title,alt:t.movie_title},slot:"cover"}),n._v(" "),e("a-card-meta",{attrs:{title:t.movie_title}})],1)}),1)],1)],2)};r._withStripped=!0;var c={render:r,staticRenderFns:[]},u=c;var l=!1;var p=e("VU/8")(s,u,!1,function(n){l||e("mIQF")},"data-v-7533ab38",null);p.options.__file="src/pages/movie/components/MovieGroupComponent.vue";t.default=p.exports}});
//# sourceMappingURL=2.46d8541ba80edbc9f7e5.js.map