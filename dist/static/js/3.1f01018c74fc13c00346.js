webpackJsonp([3,25],{GpRk:function(t,e,n){var a=n("QQMr");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("45812a84",a,!1,{})},PSzf:function(t,e,n){var a=n("iNX7");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("69ae2210",a,!1,{})},QQMr:function(t,e,n){(t.exports=n("FZ+f")(!0)).push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"Search.vue",sourceRoot:""}])},iNX7:function(t,e,n){(t.exports=n("FZ+f")(!0)).push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"Index.vue",sourceRoot:""}])},n0gN:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("Jpv8"),r={name:"Search",data:function(){return{filter:{name:"",display_name:""}}},components:{SearchIcon:a.n,RefreshCwIcon:a.m},methods:{search:function(){this.$emit("filter-changed",this.filter)},reset:function(){for(var t in this.filter)this.filter.hasOwnProperty(t)&&(this.filter[t]="");this.$emit("filter-changed",this.filter)}}},s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a-card",{staticClass:"card-common"},[n("div",{staticClass:"card-status-top bg-warning"}),t._v(" "),n("form",{attrs:{role:"search"},on:{submit:function(e){return e.preventDefault(),t.search(e)}}},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 col-md-6 mb-2"},[n("label",{staticClass:"form-label"},[t._v(t._s(t.$t("label_search_role_display_name")))]),t._v(" "),n("a-input",{model:{value:t.filter.display_name,callback:function(e){t.$set(t.filter,"display_name",e)},expression:"filter.display_name"}})],1),t._v(" "),n("div",{staticClass:"col-12 col-md-6 mb-2"},[n("label",{staticClass:"form-label"},[t._v(t._s(t.$t("label_search_role_name")))]),t._v(" "),n("a-input",{model:{value:t.filter.name,callback:function(e){t.$set(t.filter,"name",e)},expression:"filter.name"}})],1),t._v(" "),n("div",{staticClass:"col-12 col-md-6 ml-auto"},[n("label",{staticClass:"form-label",domProps:{innerHTML:t._s("&nbsp;")}}),t._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col-6"},[n("button",{staticClass:"btn btn-light btn-block border-0",attrs:{type:"button"},on:{click:t.reset}},[n("RefreshCwIcon",{staticClass:"mr-1",attrs:{size:"14"}}),t._v("\n              "+t._s(t.$t("btn_reset"))+"\n            ")],1)]),t._v(" "),n("div",{staticClass:"col-6"},[n("button",{staticClass:"btn btn-warning btn-block border-0",attrs:{type:"submit"}},[n("SearchIcon",{staticClass:"mr-1",attrs:{size:"14"}}),t._v("\n              "+t._s(t.$t("btn_search"))+"\n            ")],1)])])])])])])};s._withStripped=!0;var i={render:s,staticRenderFns:[]},o=i;var c=!1;var l=n("VU/8")(r,o,!1,function(t){c||n("GpRk")},"data-v-6f7afba6",null);l.options.__file="src/pages/role/Search.vue";e.default=l.exports},sEao:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("Gu7T"),r=n.n(a),s=n("Dd8w"),i=n.n(s),o=n("Xxa5"),c=n.n(o),l=n("exGp"),u=n.n(l),p=n("PuHW"),d=n("h9hS"),f=n("Ph1o"),m=n("iClD"),h=n("n0gN"),_=n("Jpv8"),v=n("IcnI"),g={name:"Index",components:{Search:h.default,EditIcon:_.d,Trash2Icon:_.s,PlusIcon:_.l},beforeRouteEnter:function(t,e,n){var a=this;return u()(c.a.mark(function e(){var r;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.paginate({query:{page:1,per_page:100,include:"permissions","sortBy[updated_at]":"desc"}});case 2:return r=e.sent,t.meta.list=r.data,t.meta.pagination=Object(m.a)(r.pagination),e.abrupt("return",n());case 6:case"end":return e.stop()}},e,a)}))()},data:function(){return{isLoading:!1,list:[],pagination:{},filter:{},perPage:""}},mixins:[d.a,f.a],computed:{columns:function(){return[{title:this.$t("column_role_display_name"),dataIndex:"display_name"},{title:this.$t("column_role_name"),dataIndex:"name"},{title:"",scopedSlots:{customRender:"action"}}]},currentUser:function(){return v.a.getters.profile.data}},created:function(){this.list=this.$route.meta.list,this.pagination=this.$route.meta.pagination},methods:{onPageChange:function(t){var e=this;return u()(c.a.mark(function n(){var a;return c.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return e.perPage=t.pageSize,a={page:t.current,per_page:t.pageSize},n.next=4,e.fetchList(a);case 4:case"end":return n.stop()}},n,e)}))()},onFilterChange:function(t){var e=this;return u()(c.a.mark(function n(){var a;return c.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return a={page:1,per_page:e.perPage||100},e.filter=i()({},t),n.next=4,e.fetchList(a);case 4:case"end":return n.stop()}},n,e)}))()},handleEdit:function(t){var e=this;return u()(c.a.mark(function n(){return c.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:e.$router.push({name:"role.edit",params:{id:t}}).catch(function(t){});case 1:case"end":return n.stop()}},n,e)}))()},handleDelete:function(t){var e=this;return u()(c.a.mark(function n(){return c.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,p.a.delete_role(t);case 3:return n.next=5,e.onSuccess(e.$t("message_success"),e.$t("delete_message_successfully"));case 5:return n.next=7,e.fetchList();case 7:n.next=13;break;case 9:return n.prev=9,n.t0=n.catch(0),n.next=13,e.onError(e.$t("message_error"),e.$t("delete_message_error"));case 13:case"end":return n.stop()}},n,e,[[0,9]])}))()},fetchList:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return u()(c.a.mark(function n(){var a,s,o;return c.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:for(s in t.isLoading=!0,a={},t.filter)a["filters["+s+"]"]=t.filter[s];return n.prev=3,n.next=6,p.a.paginate({query:i()({},e,a,{include:"permissions","sortBy[updated_at]":"desc"})});case 6:o=n.sent,t.list=[].concat(r()(o.data)),t.pagination=Object(m.a)(o.pagination),t.isLoading=!1,n.next=15;break;case 12:n.prev=12,n.t0=n.catch(3),t.isLoading=!1;case 15:case"end":return n.stop()}},n,t,[[3,12]])}))()}}},b=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"RoleIndex"}},[n("div",{staticClass:"btn-create"},[n("router-link",{staticClass:"btn btn-success",attrs:{to:{name:"role.create"},tag:"button"}},[n("PlusIcon",{staticClass:"mr-1",attrs:{size:"18"}}),t._v("\n      "+t._s(t.$t("btn_create"))+"\n    ")],1)],1),t._v(" "),n("Search",{on:{"filter-changed":function(e){return t.onFilterChange(e)}}}),t._v(" "),n("a-table",{attrs:{columns:t.columns,"data-source":t.list,loading:t.isLoading,rowKey:t.randomUniqueID,pagination:Object.assign({},t.pagination,{showSizeChanger:!0,buildOptionText:t.buildOptionText,pageSizeOptions:["100","50","10"],showTotal:t.showTotal})},on:{change:t.onPageChange},scopedSlots:t._u([{key:"action",fn:function(e){return[n("div",{staticClass:"btn-list justify-content-start"},[n("a-tooltip",{attrs:{placement:"bottom",title:t.$t("tooltip_edit")}},[n("button",{staticClass:"btn btn-primary font-weight-light",on:{click:function(n){return t.handleEdit(e.id)}}},[n("EditIcon",{attrs:{size:"16"}})],1)]),t._v(" "),t.hasPermissionAction(t.PERMISSIONS.DELETE_ROLE)?n("a-tooltip",{attrs:{placement:"bottom",title:t.$t("tooltip_delete")}},[n("a-popconfirm",{attrs:{title:t.$t("confirm_delete_content"),"ok-text":t.$t("confirm_yes"),"cancel-text":t.$t("confirm_no")},on:{confirm:function(n){return t.handleDelete(e.id)}}},[t.currentUser.roles.id!==e.id&&e.name!==t.USER_TYPE.super_admin?n("button",{staticClass:"btn btn-danger font-weight-light"},[n("Trash2Icon",{attrs:{size:"16"}})],1):t._e()])],1):t._e()],1)]}}])})],1)};b._withStripped=!0;var x={render:b,staticRenderFns:[]},C=x;var w=!1;var $=n("VU/8")(g,C,!1,function(t){w||n("PSzf")},"data-v-c45a9a46",null);$.options.__file="src/pages/role/Index.vue";e.default=$.exports}});
//# sourceMappingURL=3.1f01018c74fc13c00346.js.map