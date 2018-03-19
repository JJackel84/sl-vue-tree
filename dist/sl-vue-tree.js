!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.SlVueTree=t():e.SlVueTree=t()}(window,function(){return function(e){var t={};function o(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,o),i.l=!0,i.exports}return o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},o.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);var r={name:"sl-vue-tree",props:{value:{type:Array,default:()=>[]},edgeSize:{type:Number,default:3},showBranches:{type:Boolean,default:!1},level:{type:Number,default:0},parentInd:{type:Number},allowMultiselect:{type:Boolean,default:!0}},data:()=>({rootCursorPosition:null,rootDraggingNode:null}),computed:{cursorPosition(){return this.isRoot?this.rootCursorPosition:this.getParent().cursorPosition},draggingNode(){return this.isRoot?this.rootDraggingNode:this.getParent().draggingNode},nodes(){if(this.isRoot){const e=this.copy(this.value);return this.getNodes(e)}return this.getParent().nodes[this.parentInd].children},gaps(){const e=[];let t=this.level-1;for(this.showBranches||t++;t-- >0;)e.push(t);return e},isRoot(){return!this.level}},methods:{setDraggingNode(e){this.isRoot?this.rootDraggingNode=e:this.getParent().setDraggingNode(e)},setCursorPosition(e){this.isRoot?this.rootCursorPosition=e:this.getParent().setCursorPosition(e)},getNodes(e,t=[]){return e.map((o,r)=>{const i=t.concat(r);return this.getNode(i,o,e)})},getNode(e,t=null,o=null){const r=e.slice(-1)[0];return o=o||this.getNodeSiblings(this.value,e),{title:(t=t||o[r]).title,isLeaf:!!t.isLeaf,children:t.children?this.getNodes(t.children,e):[],isExpanded:void 0==t.isExpanded||!!t.isExpanded,isSelected:!!t.isSelected,data:void 0!==t.data?t.data:{},path:e,pathStr:JSON.stringify(e),ind:r,isFirstChild:0==r,isLastChild:r===o.length-1}},emitInput(e){this.getRoot().$emit("input",e)},emitSelect(e,t){this.getRoot().$emit("select",e,t)},emitDrop(e,t,o){this.getRoot().$emit("drop",e,t,o)},emitToggle(e,t){this.getRoot().$emit("toggle",e,t)},emitNodeDblclick(e,t){this.getRoot().$emit("nodedblclick",e,t)},emitNodeContextmenu(e,t){this.getRoot().$emit("nodecontextmenu",e,t)},emitNodeClick(e,t){this.getRoot().$emit("nodeClick",e,t)},onNodeClickHandler(e,t){if(!this.isRoot)return void this.getRoot().onNodeClickHandler(e,t);const o=this.copy(this.value);this.traverse((o,r)=>{o.pathStr===t.pathStr?r.isSelected=!0:e.ctrlKey&&this.allowMultiselect||r.isSelected&&(r.isSelected=!1)},o),this.emitInput(o),this.emitSelect(t,e),this.emitNodeClick(t,e)},onNodeDragoverHandler(e,t){if(!this.draggingNode)return;const o=e.currentTarget.offsetHeight,r=this.edgeSize,i=e.offsetY;let s;s=t.isLeaf?i>=o/2?"after":"before":i<=r?"before":i>=o-r?"after":"inside",this.setCursorPosition({node:t,placement:s}),this.checkNodeIsParent(this.draggingNode,this.cursorPosition.node)||e.preventDefault()},onNodeDropHandler(e,t){},onNodeDragstartHandler(e,t){this.setDraggingNode(t)},onNodeDragendHandler(e,t){if(!this.isRoot)return void this.getParent().onNodeDragendHandler(e,t);if(this.checkNodeIsParent(this.draggingNode,this.cursorPosition.node))return void this.stopDrag();const o=this.copy(this.value),r=this.getNodeSiblings(o,this.draggingNode.path)[this.draggingNode.ind],i=this.copy(r);r._markToDelete=!0;const s=this.cursorPosition.node,n=this.getNodeSiblings(o,s.path),a=n[s.ind];if("inside"==this.cursorPosition.placement)a.children=a.children||[],a.children.unshift(i);else{const e="before"===this.cursorPosition.placement?s.ind:s.ind+1;n.splice(e,0,i)}this.traverse((e,t,o)=>{if(!t._markToDelete)return!0;const r=e.ind;return o.splice(r,1),!1},o),this.emitInput(o),this.emitDrop(this.draggingNode,this.cursorPosition,e),this.stopDrag()},onToggleHandler(e,t){this.updateNode(t,{isExpanded:!t.isExpanded}),this.emitToggle(t,e),e.stopPropagation()},stopDrag(){this.setDraggingNode(null),this.setCursorPosition(null)},getParent(){return this.$parent},getRoot(){return this.isRoot?this:this.getParent().getRoot()},getNodeSiblings(e,t){return 1===t.length?e:this.getNodeSiblings(e[t[0]].children,t.slice(1))},updateNode(e,t){if(!this.isRoot)return void this.getParent().updateNode(e,t);const o=this.copy(this.value);this.traverse((o,r)=>{o.pathStr===e.pathStr&&Object.assign(r,t)},o),this.emitInput(o)},getSelected(){const e=[];return this.traverse(t=>{t.isSelected&&e.push(t)}),e},traverse(e,t=null,o=[]){t||(t=this.value);let r=!1;const i=[];return t.forEach((s,n)=>{const a=o.concat(n),d=this.getNode(a,s,t);if(r=!1===e(d,s,t),i.push(d),r)return!1;s.children&&(r=!1===this.traverse(e,s.children,a))}),!r&&i},checkNodeIsParent(e,t){const o=t.path;return JSON.stringify(o.slice(0,e.path.length))==e.pathStr},copy:e=>JSON.parse(JSON.stringify(e))}},i=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"sl-vue-tree",class:{"sl-vue-tree-root":e.isRoot},on:{dragover:function(e){e.preventDefault()}}},e._l(e.nodes,function(t,r){return o("div",{staticClass:"sl-vue-tree-node",class:{"sl-vue-tree-selected":t.isSelected}},[o("div",{directives:[{name:"show",rawName:"v-show",value:e.cursorPosition&&e.cursorPosition.node.pathStr===t.pathStr&&"before"===e.cursorPosition.placement,expression:"\n        cursorPosition &&\n        cursorPosition.node.pathStr === node.pathStr &&\n        cursorPosition.placement === 'before'\n      "}],staticClass:"sl-vue-tree-cursor sl-vue-tree-cursor_before"}),e._v(" "),o("div",{staticClass:"sl-vue-tree-node-item",class:{"sl-vue-tree-cursor-inside":e.cursorPosition&&"inside"===e.cursorPosition.placement&&e.cursorPosition.node.pathStr===t.pathStr,"sl-vue-tree-node-is-leaf":t.isLeaf,"sl-vue-tree-node-is-folder":!t.isLeaf},attrs:{draggable:"true"},on:{dragover:function(o){return e.onNodeDragoverHandler(o,t)},drop:function(o){return e.onNodeDropHandler(o,t)},dragstart:function(o){return e.onNodeDragstartHandler(o,t)},dragend:function(o){return e.onNodeDragendHandler(o,t)},click:function(o){return e.onNodeClickHandler(o,t)},contextmenu:function(o){return e.emitNodeContextmenu(t,o)},dblclick:function(o){return e.emitNodeDblclick(t,o)}}},[e._l(e.gaps,function(e){return o("div",{staticClass:"sl-vue-tree-gap"})}),e._v(" "),e.level&&e.showBranches?o("div",{staticClass:"sl-vue-tree-branch"},[e._t("branch",[t.isLastChild?e._e():o("span",[e._v("\n            "+e._s(String.fromCharCode(9500))+e._s(String.fromCharCode(9472))+" \n          ")]),e._v(" "),t.isLastChild?o("span",[e._v("\n            "+e._s(String.fromCharCode(9492))+e._s(String.fromCharCode(9472))+" \n          ")]):e._e()],{node:t})],2):e._e(),e._v(" "),o("div",{staticClass:"sl-vue-tree-title"},[t.isLeaf?e._e():o("span",{staticClass:"sl-vue-tree-toggle",on:{click:function(o){return e.onToggleHandler(o,t)}}},[e._t("toggle",[o("span",[e._v("\n             "+e._s(t.isLeaf?"":t.isExpanded?"-":"+")+"\n            ")])],{node:t})],2),e._v(" "),e._t("title",[e._v(e._s(t.title))],{node:t})],2),e._v(" "),o("div",{staticClass:"sl-vue-tree-sidebar"},[e._t("sidebar",null,{node:t})],2)],2),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.cursorPosition&&e.cursorPosition.node.pathStr===t.pathStr&&"after"===e.cursorPosition.placement,expression:"\n        cursorPosition &&\n        cursorPosition.node.pathStr === node.pathStr &&\n        cursorPosition.placement === 'after'\n      "}],staticClass:"sl-vue-tree-cursor sl-vue-tree-cursor_after"}),e._v(" "),t.children&&t.children.length&&t.isExpanded?o("sl-vue-tree",{attrs:{value:t.children,level:e.level+1,parentInd:r,allowMultiselect:e.allowMultiselect,edgeSize:e.edgeSize,showBranches:e.showBranches},scopedSlots:e._u([{key:"title",fn:function(t){var o=t.node;return[e._t("title",[e._v(e._s(o.title))],{node:o})]}},{key:"toggle",fn:function(t){var r=t.node;return[e._t("toggle",[o("span",[e._v("\n             "+e._s(r.isLeaf?"":r.isExpanded?"-":"+")+"\n          ")])],{node:r})]}},{key:"sidebar",fn:function(t){var o=t.node;return[e._t("sidebar",null,{node:o})]}}])}):e._e()],1)}))};i._withStripped=!0;var s=function(e,t,o,r,i,s,n,a){var d=typeof(e=e||{}).default;"object"!==d&&"function"!==d||(e=e.default);var l,u="function"==typeof e?e.options:e;if(t&&(u.render=t,u.staticRenderFns=o,u._compiled=!0),r&&(u.functional=!0),s&&(u._scopeId=s),n?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),i&&i.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(n)},u._ssrRegister=l):i&&(l=a?function(){i.call(this,this.$root.$options.shadowRoot)}:i),l)if(u.functional){u._injectStyles=l;var c=u.render;u.render=function(e,t){return l.call(t),c(e,t)}}else{var h=u.beforeCreate;u.beforeCreate=h?[].concat(h,l):[l]}return{exports:e,options:u}}(r,i,[],!1,null,null,null);s.options.__file="src\\sl-vue-tree.vue";t.default=s.exports}]).default});
//# sourceMappingURL=sl-vue-tree.js.map