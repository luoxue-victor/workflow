(self["webpackChunkbox"] = self["webpackChunkbox"] || []).push([["index2"],{

/***/ "./packages/react/template/demo.js":
/*!*****************************************!*\
  !*** ./packages/react/template/demo.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "App": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./packages/react/template/index.scss");

 // React Demo

var App = function App() {
  return (
    /*#__PURE__*/
    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "react-box"
    },
    /*#__PURE__*/
    react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, "React Demo"),
    /*#__PURE__*/
    react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
      className: "react-logo",
      src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
      alt: ""
    }))
  );
};

/***/ }),

/***/ "./packages/react/template/index.js":
/*!******************************************!*\
  !*** ./packages/react/template/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var _sentry_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/browser */ "./node_modules/@sentry/browser/esm/sdk.js");
/* harmony import */ var _demo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./demo */ "./packages/react/template/demo.js");




/**
 * 注册链接https://sentry.io/welcome/
 * 生成一个DSN串。 DSN是链接我们要上报的项目和sentry服务端的钥匙。
 * */

var dsn = '';
dsn && _sentry_browser__WEBPACK_IMPORTED_MODULE_3__.init({
  dsn: dsn
});
react_dom__WEBPACK_IMPORTED_MODULE_1__.render(
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0__.createElement(_demo__WEBPACK_IMPORTED_MODULE_2__.App, null), document.getElementById('app'));

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var _typescript_index_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typescript/index.ts */ "./src/typescript/index.ts");
// 加载react

new _typescript_index_ts__WEBPACK_IMPORTED_MODULE_0__.default();

if (true) {
  __webpack_require__(/*! ../packages/react/template */ "./packages/react/template/index.js");
}

/***/ }),

/***/ "./src/typescript/Foo.ts":
/*!*******************************!*\
  !*** ./src/typescript/Foo.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Foo)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Foo = function Foo() {
  _classCallCheck(this, Foo);

  var foo = 'i am foo';
  console.log(foo);
};



/***/ }),

/***/ "./src/typescript/index.ts":
/*!*********************************!*\
  !*** ./src/typescript/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Bar)
/* harmony export */ });
/* harmony import */ var _Foo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Foo */ "./src/typescript/Foo.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


new _Foo__WEBPACK_IMPORTED_MODULE_0__.default();

var Bar = function Bar() {
  _classCallCheck(this, Bar);

  var bar = '123';
  console.log(bar);
};



/***/ }),

/***/ "./packages/react/template/index.scss":
/*!********************************************!*\
  !*** ./packages/react/template/index.scss ***!
  \********************************************/
/***/ (() => {

"use strict";
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["chunk-vendors"], () => (__webpack_exec__("./src/main.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index2.1dbb25f3.bundle.js.map