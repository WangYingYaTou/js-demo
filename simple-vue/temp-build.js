/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
  "use strict";
  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  // CONCATENATED MODULE: ./node_modules/babel-loader/lib!./lib/selector.js?type=script&index=0&bustCache!./test/fixtures/basic.vue
  /* harmony default export */ 
  var basic = ({
    data() {
      return {
        msg: 'Hello from Component A!'
      };
    }
  });
  // CONCATENATED MODULE: ./lib/template-compiler?{"id":"data-v-b647d0ce","hasScoped":false,"buble":{"transforms":{}}}!./lib/selector.js?type=template&index=0&bustCache!./test/fixtures/basic.vue
  var render = function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h2", { staticClass: "red" }, [_vm._v(_vm._s(_vm.msg))])
  }
  var staticRenderFns = []
  render._withStripped = true
  var esExports = { render: render, staticRenderFns: staticRenderFns }
  /* harmony default export */ var fixtures_basic = (esExports);
  if (false) {
    module.hot.accept()
    if (module.hot.data) {
      require("vue-hot-reload-api")      .rerender("data-v-b647d0ce", esExports)
    }
  }
  // CONCATENATED MODULE: .!./test/fixtures/basic.vue
  var disposed = false
  function injectStyle (ssrContext) {
    if (disposed) return
    __webpack_require__(3)
  }
  var normalizeComponent = __webpack_require__(8)
  /* script */
  /* template */
  /* template functional */
  var __vue_template_functional__ = false
  /* styles */
  var __vue_styles__ = injectStyle
  /* scopeId */
  var __vue_scopeId__ = null
  /* moduleIdentifier (server only) */
  var __vue_module_identifier__ = null
  var Component = normalizeComponent(
    basic,
    fixtures_basic,
    __vue_template_functional__,
    __vue_styles__,
    __vue_scopeId__,
    __vue_module_identifier__
  )
  Component.options.__file = "test/fixtures/basic.vue"
  if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}
  })()}