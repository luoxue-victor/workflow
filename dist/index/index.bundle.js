(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["index"],{

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! namespace exports */
/*! exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.e, __webpack_require__.t, __webpack_require__.* */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var _src_treeShaking__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @src/treeShaking */ "./src/treeShaking.js");
// import TS from './ts/index.ts'

__webpack_require__.e(/*! import() */ "src_ts_index_ts").then(__webpack_require__.bind(__webpack_require__, /*! @src/ts/index.ts */ "./src/ts/index.ts")).then(function (res) {
  console.log(res); // eslint-disable-next-line new-cap

  new res.default();
});

__webpack_require__(/*! ./style/index.css */ "./src/style/index.css");

__webpack_require__(/*! ./style/app.css */ "./src/style/app.css");

__webpack_require__(/*! ./style/index.less */ "./src/style/index.less");

__webpack_require__(/*! ./style/index.scss */ "./src/style/index.scss");

__webpack_require__.e(/*! import() */ "src_style_index_postcss").then(__webpack_require__.t.bind(__webpack_require__, /*! ./style/index.postcss */ "./src/style/index.postcss", 7));

__webpack_require__(/*! react */ "./node_modules/react/index.js");

if (true) {
  console.log('Welcome to production');
}

console.log((0,_src_treeShaking__WEBPACK_IMPORTED_MODULE_0__.cube)(2));
var h2 = document.createElement('h2');
h2.className = 'test';
h2.innerText = 'webpack 5';
document.body.append(h2);

/***/ }),

/***/ "./src/treeShaking.js":
/*!****************************!*\
  !*** ./src/treeShaking.js ***!
  \****************************/
/*! namespace exports */
/*! export cube [provided] [used] [could be renamed] */
/*! export square [provided] [unused] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cube": () => /* binding */ cube
/* harmony export */ });
/* unused harmony export square */
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

function square(x) {
  console.log('我是一个 square');
  console.log((lodash__WEBPACK_IMPORTED_MODULE_0___default()));
  return x * x;
}
function cube(x) {
  console.log('我是一个 cube');
  return x * x * x;
}

/***/ }),

/***/ "./src/style/app.css":
/*!***************************!*\
  !*** ./src/style/app.css ***!
  \***************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements:  */
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/style/index.css":
/*!*****************************!*\
  !*** ./src/style/index.css ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements:  */
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/style/index.less":
/*!******************************!*\
  !*** ./src/style/index.less ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements:  */
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/style/index.scss":
/*!******************************!*\
  !*** ./src/style/index.scss ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [maybe used (runtime-defined)] */
/*! runtime requirements:  */
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ })

},[["./src/main.js","manifest","chunk-vendors"]]]);
//# sourceMappingURL=index.bundle.js.map