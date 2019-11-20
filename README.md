# 一步步从零开始 webpack 搭建一个大型项目

## 课题 1： 打包 src 下的 index.js index.css 到 dist/bundle.js

### 配置

package.json

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack", // 开发环境
    "build": "cross-env NODE_ENV=production webpack" // 生产环境
  },
  "dependencies": {
    "cross-env": "^6.0.3",
    "css-loader": "^3.2.0",
    "rimraf": "^3.0.0",
    "webpack": "^4.41.2"
  },
  "devDependencies": {
    "webpack-cli": "^3.3.10"
  }
}
```

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

src/index.js

```js
const css = require('css-loader!./index.css');
const a = 100;
console.log(a, css);
```

src/index.css

```css
body {
  width: 100%;
  height: 100vh;
  background-color: orange;
}
```

使用 webpack-chain 修改配置

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

## 课题 2: 将 css、js 打包进 html，并使用 devServer

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

目录

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
    // css 配置
    if (key === 'css') {
      v('css', /\.css$/);
    } else {
      v();
    }
  });

  return config;
};
```

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

config/base.js

```js
module.exports = (config, resolve) => {
  return () => {
    config
      // 入口名称
      .entry('app')
      // 入口路径
      .add(resolve('src/main.js'))
      .end()
      // 模式 "production" | "development" | "none"
      // .mode(process.env.NODE_ENV) 等价下面
      .set('mode', process.env.NODE_ENV)
      // 出口
      .output.path(resolve('dist'))
      .filename('[name].bundle.js');
  };
};
```

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

src/style/index.css

```css
.test {
  width: 200px;
  height: 200px;
  color: red;
  background-color: orange;
}
```

src/main.js

```js
require('./style/index.css');

const h2 = document.createElement('h2');
h2.className = 'test';
h2.innerText = 'test';
document.body.append(h2);
```

## 课题 3：配置 loder，ts、babel、css、less、sass、postcss

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

### 配置 ts

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

### 编译 css 对比

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
}
```

效果

``` css
/* index.css */
.test {
  width: 200px;
  height: 200px;
  color: red;
  display: flex;
  background-color: orange;
}
```
转换后

``` css
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
config.devtool('cheap-source-map')
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