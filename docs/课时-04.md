## 课题 04：webpack 性能优化 1

本章讲解

1. <a href="#4_1">分离 Manifest</a>
2. <a href="#4_2">Code Splitting（代码分割）</a>
3. <a href="#4_3">Bundle Splitting（打包分割）</a>
4. <a href="#4_4">Tree Shaking（删除死代码）</a>
5. <a href="#4_5">开启 gzip</a>

### <a href="#4_1">分离 Manifest</a>

```js
module.exports = (config, resolve) => {
  return () => {
    config.optimization.runtimeChunk({
      name: "manifest"
    });
  };
};
```

### <a href="#4_2">Code Splitting</a>

1. 使用动态 import 或者 require.ensure 语法，在第一节已经讲解
2. 使用 `babel-plugin-import` 插件按需引入一些组件库

### <a href="#4_3">Bundle Splitting</a>

将公共的包提取到 `chunk-vendors` 里面，比如你 require('vue')，webpack 会将 vue 打包进 chunk-vendors.bundle.js

```js
module.exports = (config, resolve) => {
  return () => {
    config.optimization.splitChunks({
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 3,
      maxInitialRequests: 3,
      cacheGroups: {
        vendors: {
          name: `chunk-vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "initial"
        },
        common: {
          name: `chunk-common`,
          minChunks: 2,
          priority: -20,
          chunks: "initial",
          reuseExistingChunk: true
        }
      }
    });
    config.optimization.usedExports(true);
  };
};
```

### <a href="#4_4">Tree Shaking</a>

config/optimization.js

```js
config.optimization.usedExports(true);
```

src/treeShaking.js

```js
export function square(x) {
  return x * x;
}

export function cube(x) {
  return x * x * x;
}
```

在 main.js 中只引用了 cube

```js
import { cube } from "./treeShaking";

console.log(cube(2));
```

#### 未使用 Tree Shaking

```js
{
  "./src/treeShaking.js": function(
    module,
    __webpack_exports__,
    __webpack_require__
  ) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, "square", function() {
      return square;
    });
    __webpack_require__.d(__webpack_exports__, "cube", function() {
      return cube;
    });
    function square(x) {
      return x * x;
    }
    function cube(x) {
      return x * x * x;
    }
  }
}
```

#### 使用了 Tree Shaking

这里只导出了 cube 函数，并没有将 square 导出去

当然你可以看见 square 函数还是在 bundle 里面，但是在压缩的时候就会被干掉了，因为它并没有被引用

```js
{
  "./src/treeShaking.js": function(
    module,
    __webpack_exports__,
    __webpack_require__
  ) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
      return cube;
    });
    function square(x) {
      return x * x;
    }
    function cube(x) {
      return x * x * x;
    }
  }
}
```

只有当函数给定输入后，产生相应的输出，且不修改任何外部的东西，才可以安全做 shaking 的操作

如何使用 tree-shaking？

1. 确保代码是 es6 格式,即 export，import
2. package.json 中，设置 sideEffects
3. 确保 tree-shaking 的函数没有副作用
4. babelrc 中设置 presets [["@babel/preset-env", { "modules": false }]] 禁止转换模块，交由 webpack 进行模块化处理
5. 结合 uglifyjs-webpack-plugin

其实在 `webpack4` 我们根本不需要做这些操作了，因为 `webpack` 在生产环境已经帮我们默认添加好了，开箱即用！

### <a href="#4_5">开启 gzip</a>

CompressionWebpackPlugin.js

```js
const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = (config, resolve) => {
  return () => {
    config.plugin("CompressionWebpackPlugin").use(CompressionWebpackPlugin, [
      {
        algorithm: "gzip",
        test: /\.js(\?.*)?$/i,
        threshold: 10240,
        minRatio: 0.8
      }
    ]);
  };
};
```
