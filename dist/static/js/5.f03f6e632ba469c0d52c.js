webpackJsonp([5,31],{BVru:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("Jpv8"),r={name:"Search",data:function(){return{filter:{userEmail:"",deviceId:""}}},components:{SearchIcon:a.n,RefreshCwIcon:a.m},methods:{search:function(){this.$emit("filter-changed",this.filter)},reset:function(){for(var e in this.dateRange=[],this.filter)this.filter.hasOwnProperty(e)&&(this.filter[e]="prefecture_id"===e?[]:"");this.$emit("filter-changed",this.filter)}}},i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a-card",{staticClass:"card-common"},[n("div",{staticClass:"card-status-top bg-warning"}),e._v(" "),n("form",{attrs:{role:"search"},on:{submit:function(t){return t.preventDefault(),e.search(t)}}},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 col-md-6 mb-2"},[n("label",{staticClass:"form-label"},[e._v(e._s(e.$t("label_search_device_user_mail")))]),e._v(" "),n("a-input",{model:{value:e.filter.userEmail,callback:function(t){e.$set(e.filter,"userEmail","string"==typeof t?t.trim():t)},expression:"filter.userEmail"}})],1),e._v(" "),n("div",{staticClass:"col-12 col-md-6 mb-2"},[n("label",{staticClass:"form-label"},[e._v(e._s(e.$t("label_search_device_id")))]),e._v(" "),n("a-input",{model:{value:e.filter.deviceId,callback:function(t){e.$set(e.filter,"deviceId","string"==typeof t?t.trim():t)},expression:"filter.deviceId"}})],1),e._v(" "),n("div",{staticClass:"col-12 col-md-6 ml-auto"},[n("label",{staticClass:"form-label",domProps:{innerHTML:e._s("&nbsp;")}}),e._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col-6"},[n("button",{staticClass:"btn btn-light btn-block border-0",attrs:{type:"button"},on:{click:e.reset}},[n("RefreshCwIcon",{staticClass:"mr-1",attrs:{size:"14"}}),e._v("\n              "+e._s(e.$t("btn_reset"))+"\n            ")],1)]),e._v(" "),n("div",{staticClass:"col-6"},[n("button",{staticClass:"btn btn-warning btn-block border-0",attrs:{type:"submit"}},[n("SearchIcon",{staticClass:"mr-1",attrs:{size:"14"}}),e._v("\n              "+e._s(e.$t("btn_search"))+"\n            ")],1)])])])])])])};i._withStripped=!0;var s={render:i,staticRenderFns:[]},c=s;var o=!1;var u=n("VU/8")(r,c,!1,function(e){o||n("zRHC")},"data-v-4243b966",null);u.options.__file="src/pages/device/Search.vue";t.default=u.exports},"Ny/D":function(e,t,n){var a=n("b2M4");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("180624a5",a,!1,{})},b2M4:function(e,t,n){(e.exports=n("FZ+f")(!0)).push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"Index.vue",sourceRoot:""}])},hsUo:function(e,t,n){(e.exports=n("FZ+f")(!0)).push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"Search.vue",sourceRoot:""}])},lGeH:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("Gu7T"),r=n.n(a),i=n("Dd8w"),s=n.n(i),c=n("Xxa5"),o=n.n(c),u=n("exGp"),l=n.n(u),d=n("Jpv8"),p=n("iClD"),f=n("Zx67"),h=n.n(f),v=n("Zrlr"),m=n.n(v),_=n("wxAW"),g=n.n(_),b=n("zwoO"),x=n.n(b),w=n("Pf15"),C=n.n(w),y=function(e){function t(){return m()(this,t),x()(this,(t.__proto__||h()(t)).apply(this,arguments))}return C()(t,e),g()(t,[{key:"buildUrl",value:function(e){var t=e.params;return["devices"].concat(r()(t))}}],[{key:"delete_device",value:function(){var e=l()(o.a.mark(function e(t){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(new this).request({method:"DELETE",url:"devices/"+t,isStatic:!0}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}]),t}(n("ehip").a),I=n("h9hS"),$=n("Ph1o"),S=n("BVru"),k={name:"Index",mixins:[I.a,$.a],components:{Search:S.default,EditIcon:d.d,Trash2Icon:d.s,PlusIcon:d.l},data:function(){return{isLoading:!1,list:[],pagination:{},filter:{},perPage:""}},computed:{columns:function(){return[{title:this.$t("column_device_user_email"),dataIndex:"user.email"},{title:this.$t("column_device_id"),dataIndex:"device_id"},{title:this.$t("column_device_created_at"),dataIndex:"created_at"},{title:"",scopedSlots:{customRender:"action"},align:"center"}]}},beforeRouteEnter:function(e,t,n){var a=this;return l()(o.a.mark(function t(){var r;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y.paginate({query:{page:1,per_page:100,include:"user","sortBy[updated_at]":"desc"}});case 2:r=t.sent,e.meta.list=r.data,e.meta.pagination=Object(p.a)(r.pagination),n();case 6:case"end":return t.stop()}},t,a)}))()},created:function(){this.list=this.$route.meta.list,this.pagination=this.$route.meta.pagination},methods:{onPageChange:function(e,t,n){var a=this;return l()(o.a.mark(function t(){var n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a.perPage=e.pageSize,n={page:e.current,per_page:e.pageSize},t.next=4,a.fetchList(n);case 4:case"end":return t.stop()}},t,a)}))()},onFilterChange:function(e){var t=this;return l()(o.a.mark(function n(){var a;return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return a={page:1,per_page:t.perPage||100},t.filter=s()({},e),n.next=4,t.fetchList(a);case 4:case"end":return n.stop()}},n,t)}))()},handleEdit:function(e){var t=this;return l()(o.a.mark(function n(){return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:t.$router.push({name:"device.edit",params:{id:e}}).catch(function(e){});case 1:case"end":return n.stop()}},n,t)}))()},handleDelete:function(e){var t=this;return l()(o.a.mark(function n(){var a;return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return a={page:1,per_page:t.perPage||100},n.next=3,y.delete_device(e);case 3:return n.next=5,t.onSuccess(t.$t("message_success"),t.$t("delete_message_successfully"));case 5:return n.next=7,t.fetchList(a);case 7:case"end":return n.stop()}},n,t)}))()},fetchList:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return l()(o.a.mark(function n(){var a,i,c;return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:for(i in e.isLoading=!0,a={},e.filter)a["filters["+i+"]"]=e.filter[i];return n.prev=3,n.next=6,y.paginate({query:s()({},t,a,{"sortBy[updated_at]":"desc",include:"user"})});case 6:c=n.sent,e.list=[].concat(r()(c.data)),e.pagination=Object(p.a)(c.pagination),e.isLoading=!1,n.next=15;break;case 12:n.prev=12,n.t0=n.catch(3),e.isLoading=!1;case 15:case"end":return n.stop()}},n,e,[[3,12]])}))()}}},E=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"DeviceIndex"}},[n("Search",{on:{"filter-changed":function(t){return e.onFilterChange(t)}}}),e._v(" "),n("a-table",{attrs:{columns:e.columns,"data-source":e.list,loading:e.isLoading,rowKey:e.randomUniqueID,pagination:Object.assign({},e.pagination,{showSizeChanger:!0,buildOptionText:e.buildOptionText,pageSizeOptions:["100","50","10"],showTotal:e.showTotal})},on:{change:e.onPageChange},scopedSlots:e._u([{key:"action",fn:function(t){return[n("div",{staticClass:"btn-list justify-content-start"},[e.hasPermissionAction(e.PERMISSIONS.DELETE_DEVICE)?n("a-tooltip",{attrs:{placement:"bottom",title:e.$t("tooltip_delete")}},[n("a-popconfirm",{attrs:{title:e.$t("confirm_delete_content"),"ok-text":e.$t("confirm_yes"),"cancel-text":e.$t("confirm_no")},on:{confirm:function(n){return e.handleDelete(t.id)}}},[n("button",{staticClass:"btn btn-danger font-weight-light"},[n("Trash2Icon",{attrs:{size:"16"}})],1)])],1):e._e()],1)]}}])})],1)};E._withStripped=!0;var P={render:E,staticRenderFns:[]},D=P;var L=!1;var R=n("VU/8")(k,D,!1,function(e){L||n("Ny/D")},"data-v-22ae6dbd",null);R.options.__file="src/pages/device/Index.vue";t.default=R.exports},zRHC:function(e,t,n){var a=n("hsUo");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("7a71aa0d",a,!1,{})}});
//# sourceMappingURL=5.f03f6e632ba469c0d52c.js.map