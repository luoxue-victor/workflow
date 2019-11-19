# 一步步从零开始webpack搭建一个大型项目

## 课题1： 打包 src 下的 index.js index.css 到 dist/bundle.js

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
const resolve = (src) => {
  return path.join(process.cwd(), src)
}

// 删除 dist 目录
rimraf.sync('dist')

config
  // 入口
  .entry('src/index') 
    .add(resolve('src/index.js'))
    .end()
  // 模式
  // .mode(process.env.NODE_ENV) 等价下面
  .set('mode', process.env.NODE_ENV)
  // 出口
  .output
    .path(resolve('dist'))
    .filename('[name].bundle.js');

config.module
  .rule('css')
  .test(/\.css$/)
    .use('css')
    .loader('css-loader')
      
module.exports = config.toConfig();
```

## 课题2: 将css、js打包进html，并使用devServer

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
-- build
  |-- base.js // 公共部分
  |-- build.js
  |-- dev.js
-- config
  |-- base.js // 基础配置
  |-- css.js  // css 配置
  |-- HtmlWebpackPlugin.js // html 配置
  |-- MiniCssExtractPlugin.js // 提取css
-- public  // 公共资源
  |-- index.html // html 模版
-- src // 开发目录
  |-- style
  |---- index.css
  |-- main.js // 主入口
```
build/base.js

```js
const { findSync } = require('../lib')
const Config = require('webpack-chain');
const config = new Config();
const files = findSync('config')
const path = require('path');
const resolve = (p) => {
  return path.join(process.cwd(), p)
}

module.exports = () => {
  const map = new Map()

  files.map(_ => {
    const name = _.split('/').pop().replace('.js', '')
    return map.set(name, require(_)(config, resolve))
  })

  map.forEach((v, key) => {
    // css 配置
    if (key === 'css') {
      v('css', /\.css$/);
    } else {
      v()
    }
  })
  
  return config
}
```

build/build.js

```js
const rimraf = require('rimraf');
const ora = require('ora')
const chalk = require('chalk')
const path = require('path')
// 删除 dist 目录
rimraf.sync(path.join(process.cwd(), 'dist'))

const config = require('./base')()
const webpack = require('webpack')
const spinner = ora('开始构建项目...')
spinner.start()

webpack(config.toConfig(), function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log(chalk.red('构建失败\n'))
    process.exit(1)
  }

  console.log(chalk.cyan('build完成\n'))
})
```

build/dev.js

```js
const config = require('./base')()
const webpack = require('webpack')
const chalk = require('chalk')
const WebpackDevServer = require('webpack-dev-server')
const port = 8080;
const publicPath = '/common/'

config.devServer
  .quiet(true)
  .hot(true)
  .https(false)
  .disableHostCheck(true)
  .publicPath(publicPath)
  .clientLogLevel('none')

const compiler = webpack(config.toConfig())
// 拿到 devServer 参数
const chainDevServer = compiler.options.devServer
const server = new WebpackDevServer(compiler, Object.assign(chainDevServer, {}))

  ;['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      server.close(() => {
        process.exit(0)
      })
    })
  });
// 监听端口
server.listen(port);

new Promise(() => {
  compiler.hooks.done.tap('dev', stats => {
    const empty = '    '
    const common = `App running at:
    - Local: http://127.0.0.1:${port}${publicPath}\n`
    console.log(chalk.cyan('\n' + empty + common))
  })
})
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
      .output
      .path(resolve('dist'))
      .filename('[name].bundle.js');
  }
}
```

config/css.js

```js
module.exports = (config, resolve) => {
  return (lang, test) => {
    const baseRule = config.module.rule(lang).test(test);
    const normalRule = baseRule.oneOf('normal');
    applyLoaders(normalRule)
    function applyLoaders(rule) {
      rule
        .use('extract-css-loader')
        .loader(require("mini-css-extract-plugin").loader)
        .options({
          publicPath: './'
        })
      rule
        .use('css-loader')
        .loader('css-loader')
        .options({})
    }
  }
}
```

config/HtmlWebpackPlugin.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (config, resolve) => {
  return () => {
    config.plugin('html')
      .use(HtmlWebpackPlugin, [{
        template: 'public/index.html'
      }])
  }
}
```

config/MiniCssExtractPlugin.js

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (config, resolve) => {
  return () => {
    config
      .oneOf('normal')
      .plugin('mini-css-extract')
      .use(MiniCssExtractPlugin)
  }
}
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
require('./style/index.css')

const h2 = document.createElement('h2')
h2.className = 'test'
h2.innerText = 'test'
document.body.append(h2);
```