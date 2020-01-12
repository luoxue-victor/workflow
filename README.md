<div align="center">

# 制定你自己的前端工作流

![logo](public/asset/logo-mini2.png)

### <strong>fe-workflow</strong>

[![npm][npm]][github-url]
[![node][node]][node-url]

[![star][star]][github-url]
[![issue][issue]][issue-url]
[![forks][forks]][github-url]

<!-- [![downloads][downloads]][npm-url] -->

</div>

## 为什么使用 fe-workflow？

本项目经多多次迭代，终于迎来了第三次革命。以 `@pkb/cli` 脚手架为根本，创建/配置项目，以 `webpack-box` 为服务，打包/运行项目。以 `workflow-ui` 为平台，构建工作流。

### fe-workflow 有哪些优势

- 📦 使用了目前最流行的打包工具 webpack，且使用 webpack-chain 进行 webpack 配置
- 🏈 约定式目录
- 🍁 多框架支持（vue/react/小程序等应有尽有）
- 💈 编译速度（支持一键开启 dll 等）
- 🚄 功能完备（可支持 webpack 所有最佳实践方案）
- 🎉 可插拔的插件系统（多项目管理）
- 🚀 定制化解决方案（webp、图片压缩、骨架屏等）
- 🧪 测试（单元测试、e2e）
- 📺 工具类集成（适配 adapter、callApp、无痕埋点、canvas 引擎等）
- 🔧 集成解决方案（提测、联调、部署）
- 🏠 监控（性能监控、异常错误监控）
- 🌴 界面化管理项目（待完成）
- 🍎 可扩展

### @pkb/cli 脚手架

`@pkb/cli` 为本项目的脚手架，可用来生成项目、添加插件、检查项目配置、升级更新等等，主要的功能就是对整体项目的管理。

### webpack-box 服务

1. webpack-box 是一个对 webpack 进行了封装的开箱即用的项目。集成了 webpack 的各种优化，配置了 webpack 常用到的 loader 和 plugin，原则上您不需要做任何配置就可以使用。
2. webpack-box 支持插件配置，您可以使用插件管理项目配置，可以多项目复用
3. 您也可以当作参考手册，来这里找到任何想要的 webpack 配置
4. 如果想要从头系统学习，可以切换到不同分支上，我把每课时的内容都分别切成了不同的分支，您可以在这些分支上自由尝试

#### 本项目诚邀所有共建者，一起来完善，无论你提供了多少的代码都可以被展示在贡献者名单内！

### 开发&学习

- [项目计划] 把 issue 整理到 project 中做好分类，并有计划的完成目标。
- [开发指南] 如果想要一起开发的可以参考这里。
- [插件市场] 目前已经完成的插件。
- [好的文章] 把我觉得好的 webpack 的文章整理到我的 wiki 里，也可以在项目中点击 wiki 查看。

[项目计划]: https://github.com/luoxue-victor/webpack-box/projects/1
[开发指南]: ./docs/课时-25.md
[插件市场]: https://www.npmjs.com/search?q=%40pkb
[好的文章]: https://github.com/luoxue-victor/webpack-box/wiki
[npm-url]: https://www.npmjs.com/package/webpack-box
[issue-url]: https://github.com/luoxue-victor/webpack-box/issues
[node]: https://img.shields.io/node/v/webpack.svg
[node-url]: https://nodejs.org
[github-url]: https://github.com/luoxue-victor/webpack-box
[downloads]: https://img.shields.io/npm/dt/@pkb/webpack-box.svg?style=flat-square
[npm]: https://img.shields.io/npm/v/webpack.svg
[issue]: https://img.shields.io/github/issues/luoxue-victor/webpack-box
[forks]: https://img.shields.io/github/forks/luoxue-victor/webpack-box
[star]: https://img.shields.io/github/stars/luoxue-victor/webpack-box


### 所有课题

<details >
  <summary>点击关闭/打开所有课题</summary> 
  <br/>


- [课题 01：初探 webpack](./docs/课时-01.md)
- [课题 02：搭建可插拔的开发环境跟生产环境](./docs/课时-02.md)
- [课题 03：基础配置（loder，ts、babel、css、less、sass、postcss）等](./docs/课时-03.md)
- [课题 04：webpack 性能优化 1](./docs/课时-04.md)
- [课题 05: 手写一个 loader，实现可选链](./docs/课时-05.md)
- [课题 06：webpack 编译优化](./docs/课时-06.md)
- [课题 07：多页面配置](./docs/课时-07.md)
- [课题 08：手写一个 webpack plugin](./docs/课时-08.md)
- [课题 09：webpack 构建 ssr](./docs/课时-09.md)
- [课题 10：添加 eslint 并开启自动修复](./docs/课时-10.md)
- [课题 11：添加 stylelint](./docs/课时-11.md)
- [课题 12：添加 tslint](./docs/课时-12.md)
- [课题 13：配置别名](./docs/课时-13.md)
- [课时 14：升级 webpack5](./docs/课时-14.md)
- [课时 15：定义通用变量](./docs/课时-15.md)
- [课时 16：严格区分路径大小写](./docs/课时-16.md)
- [课时 17：加载资源 images、svg、media、fonts](./docs/课时-17.md)
- [课时 18：设置全局样式](./docs/课时-18.md)
- [课时 19：添加 webpack 配置检查命令](./docs/课时-19.md)
- [课时 20：添加 prefetch + preload](./docs/课时-20.md)
- [课时 21：增加 GraphQL Server](./docs/课时-21.md)
- [课时 22：开启 mock](./docs/课时-22.md)
- [课时 23：编写插件](./docs/课时-23.md)
- [课时 24：配置 react](./docs/课时-24.md)
- [课时 25：开发指南](./docs/课时-25.md)
- [课时 26：插件市场](./docs/课时-26.md)
- [课时 27：docker 配置及使用](./docs/课时-27.md)

</details> 

### 安装

<details open=“open”>
 <summary>点击关闭/打开安装</summary><br/>

#### 1. 全局脚手架安装及使用

脚手架主要针对所有项目的管理，甚至可以针对任何非本工程的项目使用

```bash
# 全局安装
npm i -g @pkb/cli # 全局安装使用

pk create <project-name> # 创建项目（待完善）
pk add <plugin> # 安装插件
pk info # 查看项目及系统配置
```

#### 2. webpack-box 配置安装及开发

`webpack-box` 针对某个项目使用，可以在本地 `npm script` 内使用，也可以全局使用

```bash
npm i @pkb/webpack-box -D # 本地安装
npm i @pkb/webpack-box -g # 全局安装
```

</details>

### 使用

<details open=“open”>
 <summary>点击关闭/打开使用</summary><br/>

```bash
# --- 项目构建 ---
webpack-box dev   # 开发环境
webpack-box build # 生产环境
webpack-box dll   # 编译差分包
webpack-box dev index   # 指定页面编译（多页面）
webpack-box build index # 指定页面编译（多页面）
webpack-box build index --report # 开启打包分析
webpack-box build:ssr  # 编译ssr
webpack-box ssr:server # 在 server 端运行
# --- 切换 webpack 版本 ---
webpack-box upgrade 5 # 可以切换到 webpack5/4
# --- 检查配置 ---
webpack-box inspect > output.json # 导出所有配置到 output.json
webpack-box inspect --rules # 查看所有 loader 列表
webpack-box inspect --rule babel # 查看指定 loader 配置
webpack-box inspect --plugins # 查看所有插件列表
webpack-box inspect --plugin mini-css-extract # 查看指定插件配置
# --- graphql ---
webpack-box server:gql # graphql-server
# --- 插件命令及安装 ---
# npm i -D @pkb/plugin-eslint
webpack-box eslint # 自动修复 eslint 错误
# npm i -D @pkb/plugin-tslint
webpack-box tslint # 自动修复 tslint 错误
# npm i -D @pkb/plugin-stylelint
webpack-box stylelint # 自动修复 stylelint 错误
```

在 package.json 中使用

```bash
{
  "scripts": {
    "dev": "webpack-box dev",
    "build": "webpack-box build",
    ...
  }
}
```

</details>


### 所有配置

<details open=“open”>
  <summary>点击关闭/打开所有配置</summary> 
  <br/>


- [打包分析](./packages/webpack-box/config/BundleAnalyzerPlugin.js)
- [开启gzip](./packages/webpack-box/config/CompressionWebpackPlugin.js)
- [dll-plugin 配置](./packages/webpack-box/config/DllPlugin.js)
- [EnvironmentPlugin 定义通用变量](./packages/webpack-box/config/EnvironmentPlugin.js)
- [fork-ts-checher 检查ts类型](./packages/webpack-box/config/ForkTsChecker.js)
- [friendly-errors-webpack-plugin 友好错误提示](./packages/webpack-box/config/FriendlyErrorsWebpackPlugin.js)
- [html-webpack-plugin 生成html](./packages/webpack-box/config/HtmlWebpackPlugin.js)
- [mini-css-extract-plugin 配置](./packages/webpack-box/config/MiniCssExtractPlugin.js)
- [PreloadWebpackPlugin](./packages/webpack-box/config/PreloadWebpackPlugin.js)
- [ProgressBarPlugin 构建时添加进度条配置](./packages/webpack-box/config/ProgressBarPlugin.js)
- [别名配置](./packages/webpack-box/config/alias.js)
- [加载资源 images、svg、media、fonts](./packages/webpack-box/config/assets.js)
- [babel-loader 配置](./packages/webpack-box/config/babelLoader.js)
- [基础配置](./packages/webpack-box/config/base.js)
- [cache-loader 配置（webpack 5 弃用）](./packages/webpack-box/config/cacheLoader.js)
- [CaseSensitivePaths 严格区分大小写](./packages/webpack-box/config/caseSensitivePaths.js)
- [dashboard 增加仪表盘配置](./packages/webpack-box/config/dashboard.js)
- [devServer.before 在devServer中添加中间件](./packages/webpack-box/config/devServerBefore.js)
- [提取 manifest](./packages/webpack-box/config/manifest.js)
- [optimization 优化配置](./packages/webpack-box/config/optimization.js)
- [样式表配置](./packages/webpack-box/config/style.js)
- [设置 style 全局变量](./packages/webpack-box/config/styleResourcesLoader.js)
- [多线程配置](./packages/webpack-box/config/threadLoader.js)
- [tslint 配置](./packages/webpack-box/config/tslintPlugin.js)
- [eslint-loader 配置](./packages/eslint/webpack-chain.config.js)
- [react 配置](./packages/react/webpack-chain.config.js)
- [stylelint 配置](./packages/stylelint/webpack-chain.config.js)

</details> 



### 扩展配置

<details open=“open”>
  <br/>
  <summary>点击关闭/打开扩展配置</summary>
在根目录下添加 `box.config.js`，即可配置使用

box.config.js
  
```js
const path = require('path')
function resolve (dir) {
  return path.join(process.cwd(), dir)
}

module.exports = function (config) {
  /**
   * @param {object} dll 开启差分包
   * @param {object} pages 多页面配置 通过 box run/build index 来使用
   * @param {function} chainWebpack
   * @param {string} entry 入口
   * @param {string} output 出口
   * @param {string} publicPath
   * @param {string} port 端口
   * @param {object} eslint eslint 配置
   * @param {object} stylelint stylelint 配置
   * @param {object} eslint eslint 配置
   * @param {object} alias 配置别名
   * @param {object} env 配置通用变量，可以在 node 跟 web 之间共同使用
   * @param {Boolean} filenameHashing 文件名是否使用 hash，当文件发生变动的时候 filename 才会改变
   * @param {Boolean} css 配置 css
   * @param {Boolean} mock 开启 mock
   */
  return {
    entry: 'src/main.js',
    output: 'dist',
    publicPath: '/common/',
    port: 8889,
    mock: true,
    env: {
      REACT: 'react' // 配置 react
    },
    alias: {
      '@': resolve('src'),
      '@src': resolve('src')
    },
    resources: {
      less: {
        patterns: [
          path.resolve(__dirname, './src/global/*.less')
        ]
      },
      scss: {
        patterns: [
          path.resolve(__dirname, './src/global/*.scss')
        ]
      }
    },
    css: {
      sourceMap: true,
      loaderOptions: {
        css: {},
        less: {
          globalVars: {
            gray: '#ccc'
          }
        },
        sass: {},
        postcss: {},
        stylus: {}
      },
      isCssModule: false, // 是否对css进行模块化处理
      needInlineMinification: false // 是否需要压缩css
    },
    filenameHashing: true,
    eslint: {
      lintOnSave: true, // 开启运行时检测
      extensions: ['js', 'jsx', 'vue'] // 默认 ['js', 'jsx']
    },
    tslint: {
      lintOnSave: true, // 开启运行时检测
      useThreads: true
    },
    stylelint: {
      lintOnSave: true // 开启运行时检测
      // extensions: ['vue', 'htm', 'html', 'css', 'sss', 'less', 'scss']
    },
    // dll: {
    //   venders: ['react']
    // },
    pages: {
      index: {
        entry: 'src/main.js',
        template: 'public/index.html',
        filename: 'index.html'
      },
      index2: {
        entry: 'src/main.js',
        template: 'public/index2.html',
        filename: 'index2.html'
      }
    },
    chainWebpack(config) {}
  }
}

```

</details>  


### 贡献者名单

<a href="https://github.com/luoxue-victor/">

![](https://avatars0.githubusercontent.com/u/25242102?s=40&v=4)
</a><a href="https://github.com/liuys1107">
![](https://avatars2.githubusercontent.com/u/25242149?s=40&v=4)
</a>
