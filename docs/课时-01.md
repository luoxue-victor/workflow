## 课题 01：初探 webpack

想要学好 `webpack`，我们首先要了解 `webpack` 的机制，我们先从 js 加载 css 开始学习。

我们从下面这个小练习开始走进 `webpack` 吧

在 `index.js` 中引入 `index.css`

```js
const css = require("./index.css");
console.log(css);
```

css 文件并不能被 js 识别，webpack 也不例外，上述的写法不出意外会报错

我们如何让 webpack 识别 css 呢，答案就在 webpack 给我们提供了 loader 机制，可以让我们通过 loader 将任意的文件转成 webpack 可以识别的文件

本章主要讲解

1. <a href="#1_1">webpack 基础配置</a>
2. <a href="#1_2">解析 bundle 如何加载模块</a>
3. <a href="#1_3">动态 import 加载原理</a>
4. <a href="#1_4">使用 webpack-chain 重写配置</a>
5. <a href="#1_5">课时 1 小结</a>

### <a name="1_1">webpack 基础配置</a>

#### 需要的依赖包

package.json

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack", // 开发环境
    "build": "cross-env NODE_ENV=production webpack" // 生产环境
  },
  "dependencies": {
    "cross-env": "^6.0.3", // 兼容各种环境
    "css-loader": "^3.2.0",
    "rimraf": "^3.0.0", // 删除文件
    "webpack": "^4.41.2"
  },
  "devDependencies": {
    "webpack-cli": "^3.3.10"
  }
}
```

#### webpack 基础配置

webpack.config.js

```js
const path = require("path");
const rimraf = require("rimraf");

// 删除 dist 目录
rimraf.sync("dist");

// webpack 配置
module.exports = {
  entry: "./src/index",
  mode: process.env.NODE_ENV,
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
```

#### css 引入到 js

src/index.js

```js
const css = require("css-loader!./index.css");
const a = 100;
console.log(a, css);
```

#### 测试 css

src/index.css

```css
body {
  width: 100%;
  height: 100vh;
  background-color: orange;
}
```

### <a name="1_2">解析 bundle 如何加载模块</a>

我删掉了一些注释跟一些干扰内容，这样看起来会更清晰一点

- `bundle` 是一个立即执行函数，可以认为它是把所有模块捆绑在一起的一个巨型模块。
- `webpack` 将所有模块打包成了 `bundle` 的依赖，通过一个对象注入
- `0 模块` 就是入口
- `webpack` 通过 `__webpack_require__` 引入模块
- `__webpack_require__` 就是我们使用的 `require`，被 `webpack` 封装了一层

dist/bundle.js

```js
(function(modules) {
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    });

    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );

    module.l = true;

    return module.exports;
  }
  return __webpack_require__((__webpack_require__.s = 0));
})({
  "./src/index.js": function(module, exports, __webpack_require__) {
    eval(`
      const css = __webpack_require__("./src/style/index.css")
      const a = 100;
      console.log(a, css)
    `);
  },

  "./src/style/index.css": function(module, exports, __webpack_require__) {
    eval(`
      exports = module.exports = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(false);
      exports.push([module.i, "body {
        width: 100%;
        height: 100vh;
        background-color: orange;
      }", ""]);
    `);
  },

  0: function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__("./src/index.js");
  }
});
```

### <a name="1_3">动态 import 加载原理</a>

如果我们把 index.js 的 require 改成 import 会发生什么？

我们知道 `import` 跟 `require` 的区别是，`import` 是动态加载只有在用到的时候才会去加载，而 `require` 只要声明了就会加载，`webpack` 遇到了 `require` 就会把它当成一个模块加载到 `bundle` 的依赖里

那么问题来了，如果我们使用了 import 去引用一个模块，它是如何加载的呢？

#### require 改成 import()

src/index.js

```js
// const css = require('css-loader!./index.css');
const css = import("css-loader!./index.css");
const a = 100;
console.log(a, css);
```

#### 动态加载打包结果

除了正常的 `bundle` 之外，我们还可以看见一个 `0.boundle.js`

`0.boundle.js` 就是我们的动态加载的 `index.css` 模块

```js
|-- bundle.js
|-- 0.boundle.js
```

#### 动态模块

0.boundle.js

这个文件就是把我们 `import` 的模块放进了一个单独的 `js` 文件中

```js
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  [0],
  {
    "./node_modules/css-loader/dist/runtime/api.js": function(
      module,
      exports,
      __webpack_require__
    ) {
      "use strict";
      eval(`
        ...
      `);
    },

    "./src/style/index.css": function(module, exports, __webpack_require__) {
      eval(`
        exports = module.exports = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(false));
        exports.push([module.i, \`body {
          width: 100%;
          height: 100vh;
          background-color: orange;
        },"\`]
      `);
    }
  }
]);
```

#### 动态模块加载逻辑

我们再看下 dist/bundle.js

方便理解，我把大部分代码和注释都删掉了

原理很简单，就是利用的 jsonp 的实现原理加载模块，只是在这里并不是从 server 拿数据而是从其他模块中

1. 调用模块时会在 `window` 上注册一个 `webpackJsonp` 数组，window['webpackJsonp'] = window['webpackJsonp'] || []
2. 当我们 `import`时，`webpack` 会调用 `__webpack_require__.e(0)` 方法，也就是 `requireEnsure`
3. `webpack` 会动态创建一个 `script` 标签去加载这个模块，加载成功后会将该模块注入到 `webpackJsonp` 中
4. `webpackJsonp.push` 会调用 `webpackJsonpCallback` 拿到模块
5. 模块加载完（then）再使用 `__webpack_require__` 获取模块

```js
(function(modules) {
  function webpackJsonpCallback(data) {
    var chunkIds = data[0];
    var moreModules = data[1];
    var moduleId,
      chunkId,
      i = 0,
      resolves = [];
    for (; i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      if (
        Object.prototype.hasOwnProperty.call(installedChunks, chunkId) &&
        installedChunks[chunkId]
      ) {
        resolves.push(installedChunks[chunkId][0]);
      }
      // 模块安装完
      installedChunks[chunkId] = 0;
    }
    for (moduleId in moreModules) {
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }
    if (parentJsonpFunction) parentJsonpFunction(data);
    while (resolves.length) {
      // 执行所有 promise 的 resolve 函数
      resolves.shift()();
    }
  }

  function jsonpScriptSrc(chunkId) {
    return __webpack_require__.p + "" + ({}[chunkId] || chunkId) + ".bundle.js";
  }

  function __webpack_require__(moduleId) {
    // ...
  }

  __webpack_require__.e = function requireEnsure(chunkId) {
    var promises = [];
    // ...
    var script = document.createElement("script");
    var onScriptComplete;
    script.charset = "utf-8";
    script.timeout = 120;
    script.src = jsonpScriptSrc(chunkId);

    onScriptComplete = function(event) {
      // 处理异常，消除副作用
      // ...
    };
    var timeout = setTimeout(function() {
      onScriptComplete({ type: "timeout", target: script });
    }, 120000);
    script.onerror = script.onload = onScriptComplete;
    document.head.appendChild(script);
    // ...
    // 动态加载模块
    return Promise.all(promises);
  };

  var jsonpArray = (window["webpackJsonp"] = window["webpackJsonp"] || []);
  // 重写数组 push 方法
  jsonpArray.push = webpackJsonpCallback;
  jsonpArray = jsonpArray.slice();
  for (var i = 0; i < jsonpArray.length; i++)
    webpackJsonpCallback(jsonpArray[i]);

  return __webpack_require__((__webpack_require__.s = 0));
})({
  "./src/index.js": function(module, exports, __webpack_require__) {
    eval(`
        const css = __webpack_require__.e(0).then(__webpack_require__.t.bind(null, "./src/style/index.css", 7))
        const a = 100;
        console.log(a, css)
      `);
  },
  0: function(module, exports, __webpack_require__) {
    eval(`module.exports = __webpack_require__("./src/index.js");`);
  }
});
```

### <a name="1_4">使用 webpack-chain 重写配置</a>

我们用 webpack-chain 来写 webpack 的配置，原因是 webpack-chain 的方式更加灵活

官方解释

> `webpack-chain` 尝试通过提供可链式或顺流式的 `API` 创建和修改 `webpack` 配置。`API` 的 `Key` 部分可以由用户指定的名称引用，这有助于跨项目修改配置方式的标准化。

```js
const path = require("path");
const rimraf = require("rimraf");
const Config = require("webpack-chain");
const config = new Config();
const resolve = src => {
  return path.join(process.cwd(), src);
};

// 删除 dist 目录
rimraf.sync("dist");

config
  // 入口
  .entry("src/index")
  .add(resolve("src/index.js"))
  .end()
  // 模式
  // .mode(process.env.NODE_ENV) 等价下面
  .set("mode", process.env.NODE_ENV)
  // 出口
  .output.path(resolve("dist"))
  .filename("[name].bundle.js");

config.module
  .rule("css")
  .test(/\.css$/)
  .use("css")
  .loader("css-loader");

module.exports = config.toConfig();
```

### <a name="1_5">课时 1 小结</a>

至此课时 1 已经结束了，我们主要做了以下事情

1. webpack 基础配置
2. 将 css 通过 css-loader 打包进 js 中
3. 解析 bundle 如何加载模块的
4. webpack 如何实现的动态加载模块

学习一个工具我们不仅要看懂它的配置，还要对它的原理一起了解，只有学到框架的精髓，我们才能应对如今大前端如此迅猛的发展。

---
