# 一步步从零开始 webpack 搭建一个大型项目

> 很多人都或多或少使用过 webpack，但是很少有人能够系统的学习 webpack 配置，遇到错误的时候就会一脸懵，不知道从哪查起？性能优化时也不知道能做什么，网上的优化教程是不是符合自己的项目？等一系列问题！本文从最基础配置一步步到一个完善的大型项目的过程。让你对 webpack 再也不会畏惧，让它真正成为你的得力助手！

本文从下面几个课题来实现

- 课题 1: css 如何打包进 js？探究 webpack 打包原理。
- 课题 2：搭建开发环境跟生产环境
- 课题 3：基础配置（loder，ts、babel、css、less、sass、postcss）等
- 课时 4：webpack 性能优化1

## 课题 1: js 是如何引用 css 的？

> 打包 src 下的 index.js index.css 到 dist/bundle.js

css 并不能被 webpack 识别，但是可以通过 loader 来将 css 转换成 js

可以分为以下几步实现

1. dev 打包出未压缩文件
2. build 打包出压缩文件
3. 将 css 打包进 js 文件
4. 输出 bundle.js
5. 使用 webpack-chain 重写配置

### webpack 基础配置

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
const path = require('path');
const rimraf = require('rimraf');

// 删除 dist 目录
rimraf.sync('dist');

// webpack 配置
module.exports = {
  entry: './src/index',
  mode: process.env.NODE_ENV,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

#### css 引入到 js

src/index.js

```js
const css = require('css-loader!./index.css');
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

### 解析 bundle 如何加载模块

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
  './src/index.js': function(module, exports, __webpack_require__) {
    eval(`
      const css = __webpack_require__("./src/style/index.css")
      const a = 100;
      console.log(a, css)
    `);
  },

  './src/style/index.css': function(module, exports, __webpack_require__) {
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
    module.exports = __webpack_require__('./src/index.js');
  }
});
```

### 动态 import 加载原理

如果我们把 index.js 的 require 改成 import 会发生什么？

我们知道 `import` 跟 `require` 的区别是，`import` 是动态加载只有在用到的时候才会去加载，而 `require` 只要声明了就会加载，`webpack` 遇到了 `require` 就会把它当成一个模块加载到 `bundle` 的依赖里

那么问题来了，如果我们使用了 import 去引用一个模块，它是如何加载的呢？

#### require 改成 import()

src/index.js

```js
// const css = require('css-loader!./index.css');
const css = import('css-loader!./index.css');
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
(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  [0],
  {
    './node_modules/css-loader/dist/runtime/api.js': function(
      module,
      exports,
      __webpack_require__
    ) {
      'use strict';
      eval(`
        ...
      `);
    },

    './src/style/index.css': function(module, exports, __webpack_require__) {
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
    return __webpack_require__.p + '' + ({}[chunkId] || chunkId) + '.bundle.js';
  }

  function __webpack_require__(moduleId) {
    // ...
  }

  __webpack_require__.e = function requireEnsure(chunkId) {
    var promises = [];
    // ...
    var script = document.createElement('script');
    var onScriptComplete;
    script.charset = 'utf-8';
    script.timeout = 120;
    script.src = jsonpScriptSrc(chunkId);

    onScriptComplete = function(event) {
      // 处理异常，消除副作用
      // ...
    };
    var timeout = setTimeout(function() {
      onScriptComplete({ type: 'timeout', target: script });
    }, 120000);
    script.onerror = script.onload = onScriptComplete;
    document.head.appendChild(script);
    // ...
    // 动态加载模块
    return Promise.all(promises);
  };

  var jsonpArray = (window['webpackJsonp'] = window['webpackJsonp'] || []);
  // 重写数组 push 方法
  jsonpArray.push = webpackJsonpCallback;
  jsonpArray = jsonpArray.slice();
  for (var i = 0; i < jsonpArray.length; i++)
    webpackJsonpCallback(jsonpArray[i]);

  return __webpack_require__((__webpack_require__.s = 0));
})({
  './src/index.js': function(module, exports, __webpack_require__) {
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

### 使用 webpack-chain 重写上面配置

我们用 webpack-chain 来写 webpack 的配置，原因是 webpack-chain 的方式更加灵活

官方解释

> `webpack-chain` 尝试通过提供可链式或顺流式的 `API` 创建和修改 `webpack` 配置。`API` 的 `Key` 部分可以由用户指定的名称引用，这有助于跨项目修改配置方式的标准化。

```js
const path = require('path');
const rimraf = require('rimraf');
const Config = require('webpack-chain');
const config = new Config();
const resolve = src => {
  return path.join(process.cwd(), src);
};

// 删除 dist 目录
rimraf.sync('dist');

config
  // 入口
  .entry('src/index')
  .add(resolve('src/index.js'))
  .end()
  // 模式
  // .mode(process.env.NODE_ENV) 等价下面
  .set('mode', process.env.NODE_ENV)
  // 出口
  .output.path(resolve('dist'))
  .filename('[name].bundle.js');

config.module
  .rule('css')
  .test(/\.css$/)
  .use('css')
  .loader('css-loader');

module.exports = config.toConfig();
```

### 课时 1 小结

至此课时 1 已经结束了，我们主要做了以下事情

1. webpack 基础配置
2. 将 css 通过 css-loader 打包进 js 中
3. 解析 bundle 如何加载模块的
4. webpack 如何实现的动态加载模块

学习一个工具我们不仅要看懂它的配置，还要对它的原理一起了解，只有学到框架的精髓，我们才能应对如今大前端如此迅猛的发展。

---

## 课题 2：搭建可插拔的开发环境跟生产环境

本章提要：

- 需要哪些包？
- 构建开发环境（devServer）
- 构建生产环境
- 自动生成 html
- 提取 css

### 需要哪些包？

package.json

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development node build/dev.js",
    "build": "cross-env NODE_ENV=production node build/build.js"
  },
  "dependencies": {
    "@commitlint/config-conventional": "^8.2.0",
    "cross-env": "^6.0.3",
    "css-loader": "^3.2.0",
    "cssnano": "^4.1.10",
    "ora": "^4.0.3",
    "rimraf": "^3.0.0",
    "webpack": "^4.41.2"
  },
  "devDependencies": {
    "extract-text-webpack-plugin": "^3.0.2",
    "html-webpack-plugin": "^3.2.0",
    "mini-css-extract-plugin": "^0.8.0",
    "vue-cli-plugin-commitlint": "^1.0.4",
    "webpack-chain": "^6.0.0",
    "webpack-cli": "^3.3.10",
    "webpack-dev-server": "^3.9.0"
  }
}
```

### 目录

```js
|-- build
  |-- base.js // 公共部分
  |-- build.js
  |-- dev.js
|-- config
  |-- base.js // 基础配置
  |-- css.js  // css 配置
  |-- HtmlWebpackPlugin.js // html 配置
  |-- MiniCssExtractPlugin.js // 提取css
|-- public  // 公共资源
  |-- index.html // html 模版
|-- src // 开发目录
  |-- style
  |---- index.css
  |-- main.js // 主入口
```

### 实现可插拔配置

build/base.js

```js
const { findSync } = require('../lib');
const Config = require('webpack-chain');
const config = new Config();
const files = findSync('config');
const path = require('path');
const resolve = p => {
  return path.join(process.cwd(), p);
};

module.exports = () => {
  const map = new Map();

  files.map(_ => {
    const name = _.split('/')
      .pop()
      .replace('.js', '');
    return map.set(name, require(_)(config, resolve));
  });

  map.forEach((v, key) => {
    v();
  });

  return config;
};
```

### 生产环境搭建

build/build.js

```js
const rimraf = require('rimraf');
const ora = require('ora');
const chalk = require('chalk');
const path = require('path');
// 删除 dist 目录
rimraf.sync(path.join(process.cwd(), 'dist'));

const config = require('./base')();
const webpack = require('webpack');
const spinner = ora('开始构建项目...');
spinner.start();

webpack(config.toConfig(), function(err, stats) {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n'
  );

  if (stats.hasErrors()) {
    console.log(chalk.red('构建失败\n'));
    process.exit(1);
  }

  console.log(chalk.cyan('build完成\n'));
});
```

### 开发环境搭建

build/dev.js

```js
const config = require('./base')();
const webpack = require('webpack');
const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server');
const port = 8080;
const publicPath = '/common/';

config.devServer
  .quiet(true)
  .hot(true)
  .https(false)
  .disableHostCheck(true)
  .publicPath(publicPath)
  .clientLogLevel('none');

const compiler = webpack(config.toConfig());
// 拿到 devServer 参数
const chainDevServer = compiler.options.devServer;
const server = new WebpackDevServer(
  compiler,
  Object.assign(chainDevServer, {})
);

['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    server.close(() => {
      process.exit(0);
    });
  });
});
// 监听端口
server.listen(port);

new Promise(() => {
  compiler.hooks.done.tap('dev', stats => {
    const empty = '    ';
    const common = `App running at:
    - Local: http://127.0.0.1:${port}${publicPath}\n`;
    console.log(chalk.cyan('\n' + empty + common));
  });
});
```

### 提取 css

config/css.js

```js
module.exports = (config, resolve) => {
  return (lang, test) => {
    const baseRule = config.module.rule(lang).test(test);
    const normalRule = baseRule.oneOf('normal');
    applyLoaders(normalRule);
    function applyLoaders(rule) {
      rule
        .use('extract-css-loader')
        .loader(require('mini-css-extract-plugin').loader)
        .options({
          publicPath: './'
        });
      rule
        .use('css-loader')
        .loader('css-loader')
        .options({});
    }
  };
};
```

### 自动生成 html

config/HtmlWebpackPlugin.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (config, resolve) => {
  return () => {
    config.plugin('html').use(HtmlWebpackPlugin, [
      {
        template: 'public/index.html'
      }
    ]);
  };
};
```

### css 提取插件

config/MiniCssExtractPlugin.js

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (config, resolve) => {
  return () => {
    config
      .oneOf('normal')
      .plugin('mini-css-extract')
      .use(MiniCssExtractPlugin);
  };
};
```

### 测试文件

#### 测试 html 模板

public/index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>learn_webpack</title>
  <body></body>
</html>
```

#### 测试 css 模板

src/style/index.css

```css
.test {
  width: 200px;
  height: 200px;
  color: red;
  background-color: orange;
}
```

#### 程序入口

src/main.js

```js
require('./style/index.css');

const h2 = document.createElement('h2');
h2.className = 'test';
h2.innerText = 'test';
document.body.append(h2);
```

-------------------------------------------------------

## 课题 3：基础配置（loder，ts、babel、css、less、sass、postcss）等

本章提要：

- 配置 babel
- 使用 babel 配置 ts
- ts 静态类型检查
- 友好错误提示插件
- 配置样式，style，css、less、sass、postcss 等
- 编译前后 css 对比
- postcss 配置
- 配置 autoprefixer
- 开启 source map

### 目录

增加以下文件

```js
// 配置目录
|-- config
  |-- babelLoader.js  // babel-loader 配置
  |-- ForkTsChecker.js // ts 静态检查
  |-- FriendlyErrorsWebpackPlugin.js // 友好错误提示
  |-- style
// 开发目录
|-- src
  |-- style
    |-- app.css
    |-- index.less      // 测试 less
    |-- index.scss      // 测试 sass
    |-- index.postcss   // 测试 postcss
  |-- ts
    |-- index.ts        // 测试 ts
|-- babel.js
|-- postcss.config.js   // postcss 配置
|-- tsconfig.json       // ts 配置
// 打包后的目录
|--dist
  |-- app.bundle.js
  |-- app.css
  |-- index.html
```

### 配置 babel

config/babelLoader.js

```js
module.exports = (config, resolve) => {
  const baseRule = config.module.rule('js').test(/.js|.tsx?$/);
  const babelPath = resolve('babel.js');
  const babelConf = require(babelPath);
  const version = require(resolve('node_modules/@babel/core/package.json'))
    .version;
  return () => {
    baseRule
      .use('babel')
      .loader(require.resolve('babel-loader'))
      .options(babelConf({ version }));
  };
};
```

### 使用 babel 配置 ts

这里我们使用 `babel` 插件 `@babel/preset-typescript` 将 `ts` 转成 `js，并使用` `ForkTsCheckerWebpackPlugin`、`ForkTsCheckerNotifierWebpackPlugin` 插件进行错误提示。

babel.js

```js
module.exports = function(api) {
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            chrome: 59,
            edge: 13,
            firefox: 50,
            safari: 8
          }
        }
      ],
      [
        '@babel/preset-typescript',
        {
          allExtensions: true
        }
      ]
    ],
    plugins: [
      '@babel/plugin-transform-typescript',
      'transform-class-properties',
      '@babel/proposal-object-rest-spread'
    ]
  };
};
```

### ts 静态类型检查

```js
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');

module.exports = (config, resolve) => {
  return () => {
    config.plugin('ts-fork').use(ForkTsCheckerWebpackPlugin, [
      {
        // 将async设为false，可以阻止Webpack的emit以等待类型检查器/linter，并向Webpack的编译添加错误。
        async: false
      }
    ]);
    // 将TypeScript类型检查错误以弹框提示
    // 如果fork-ts-checker-webpack-plugin的async为false时可以不用
    // 否则建议使用，以方便发现错误
    config.plugin('ts-notifier').use(ForkTsCheckerNotifierWebpackPlugin, [
      {
        title: 'TypeScript',
        excludeWarnings: true,
        skipSuccessful: true
      }
    ]);
  };
};
```

### 友好错误提示

config/FriendlyErrorsWebpackPlugin.js

```js
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = (config, resolve) => {
  return () => {
    config.plugin('error').use(FriendlyErrorsWebpackPlugin);
  };
};
```

### 配置 style，css、less、sass、postcss 等

```js
module.exports = (config, resolve) => {
  const createCSSRule = (lang, test, loader, options = {}) => {
    const baseRule = config.module.rule(lang).test(test);
    const normalRule = baseRule.oneOf('normal');
    normalRule
      .use('extract-css-loader')
      .loader(require('mini-css-extract-plugin').loader)
      .options({
        hmr: process.env.NODE_ENV === 'development',
        publicPath: '/'
      });
    normalRule
      .use('css-loader')
      .loader(require.resolve('css-loader'))
      .options({});
    normalRule.use('postcss-loader').loader(require.resolve('postcss-loader'));
    if (loader) {
      const rs = require.resolve(loader);
      normalRule
        .use(loader)
        .loader(rs)
        .options(options);
    }
  };

  return () => {
    createCSSRule('css', /\.css$/, 'css-loader', {});
    createCSSRule('less', /\.less$/, 'less-loader', {});
    createCSSRule('scss', /\.scss$/, 'sass-loader', {});
    createCSSRule('postcss', /\.p(ost)?css$/);
  };
};
```

### postcss 配置

```js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [],
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568
    }
  }
};
```

### 编译后 css 对比

src/style/index.less

```less
/* index.less */
.test {
  width: 300px;
}
```

dist/app.css

```css
/* index.css */
.test {
  width: 26.66667vw;
  height: 26.66667vw;
  color: red;
  background-color: orange;
}
/* app.css */
.test {
  font-size: 8vw;
}
/* index.less */
.test {
  width: 40vw;
}

/* index.scss */
.test {
  height: 40vw;
}
/* index.postcss */
.test {
  background: green;
  height: 26.66667vw;
}
```

### 配置 autoprefixer

自动添加 css 前缀

postcss.config.js

```js
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        '> 1%',
        'last 3 versions',
        'iOS >= 8',
        'Android >= 4',
        'Chrome >= 40'
      ]
    }
  }
};
```

#### 转换前

```css
/* index.css */
.test {
  width: 200px;
  height: 200px;
  color: red;
  display: flex;
  background-color: orange;
}
```

#### 转换后

```css
/* index.css */
.test {
  width: 26.66667vw;
  height: 26.66667vw;
  color: red;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  background-color: orange;
}
```

### 开启 source map

```js
config.devtool('cheap-source-map');
```

```js
|--dist
  |-- app.bundle.js
  |-- app.bundle.js.map
  |-- app.css
  |-- app.css.map
  |-- index.html
```

在源文件下会有一行注释，证明开启了 sourcemap

```js
/*# sourceMappingURL=app.css.map*/
```

---

## 课时 4：webpack 性能优化1

本章讲解

1. 分离 Manifest
2. Code Splitting（代码分割）
3. Bundle Splitting（打包分割）
4. Tree Shaking（删除死代码）
5. 开启 gzip

### 分离 Manifest

```js
module.exports = (config, resolve) => {
  return () => {
    config
      .optimization
      .runtimeChunk({
        name: "manifest"
      })
  }
}
```

### Code Splitting

1. 使用动态 import 或者 require.ensure 语法，在第一节已经讲解
2. 使用 `babel-plugin-import` 插件按需引入一些组件库

### Bundle Splitting

将公共的包提取到 `chunk-vendors` 里面，比如你require('vue')，webpack 会将 vue 打包进 chunk-vendors.bundle.js

```js
module.exports = (config, resolve) => {
  return () => {
    config
      .optimization.splitChunks({
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 3,
        maxInitialRequests: 3,
        cacheGroups: {
          vendors: {
            name: `chunk-vendors`,
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          },
          common: {
            name: `chunk-common`,
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      })
    config.optimization.usedExports(true)
  }
}
```

### Tree Shaking

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
import { cube } from './treeShaking';

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

只有当函数给定输入后，产生相应的输出，且不修改任何外部的东西，才可以安全做shaking的操作

如何使用tree-shaking？

1. 确保代码是es6格式,即 export，import
2. package.json中，设置 sideEffects
3. 确保 tree-shaking 的函数没有副作用
4. babelrc中设置presets [["@babel/preset-env", { "modules": false }]] 禁止转换模块，交由webpack进行模块化处理
5. 结合uglifyjs-webpack-plugin

其实在 `webpack4` 我们根本不需要做这些操作了，因为 `webpack` 在生产环境已经帮我们默认添加好了，开箱即用！

### 开启 gzip

CompressionWebpackPlugin.js

```js
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = (config, resolve) => {
  return () => {
    config.plugin('CompressionWebpackPlugin').use(CompressionWebpackPlugin, [
      {
        algorithm: 'gzip',
        test: /\.js(\?.*)?$/i,
        threshold: 10240,
        minRatio: 0.8
      }
    ]);
  };
};
```

## 课时 5：webpack 性能优化2



