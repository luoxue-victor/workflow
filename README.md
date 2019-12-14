# webpack 工程师的自我修养

> 本来想要做一个大型项目的 webpack 教程，但是我发现还可以做更多的事情，所以这里我要将这个项目做成 webpack 手册，您可以来这里找到任何想要的 webpack 配置

如果想要从头系统学习，可以切换到不同分支上，我把每课时的内容都分别切成了不同的分支，您可以在这些分支上自由尝试

本项目诚邀所有共建者，一起来完善，无论你提供了多少的代码都可以被展示在贡献者名单内！


### 所有课题

<details open=“open”>
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
- [课时 17：设置全局样式](./docs/课时-18.md)

</details> 

### 安装

<details open=“open”>
 <summary>点击关闭/打开安装</summary><br/>

```bash
npm i -g webpack-box # 全局安装使用
npm link # 建立软连接，可以使用 webpack-box 命令
```

</details>

### 使用

<details open=“open”>
 <summary>点击关闭/打开使用</summary><br/>

```bash
webpack-box dev   # 开发环境
webpack-box build # 生产环境
webpack-box dll   # 编译差分包
webpack-box dev index   # 指定页面编译（多页面）
webpack-box build index # 指定页面编译（多页面）
webpack-box build index --report # 开启打包分析
webpack-box build:ssr  # 编译ssr
webpack-box ssr:server # 在 server 端运行
webpack-box lint eslint # 自动修复 eslint 错误
webpack-box lint tslint # 自动修复 tslint 错误
webpack-box lint stylelint # 自动修复 stylelint 错误
webpack-box upgrade 5 # 可以切换到 webpack5/4
```

在 package.json 中使用

```json
{
  "scripts": {
    "dev": "webpack-box dev",
    "build": "webpack-box build",
    "dll": "webpack-box dll",
    "build:ssr": "webpack-box build:ssr",
    "ssr:server": "webpack-box ssr:server"
  }
}
```

</details>


### 所有配置

<details open=“open”>
  <summary>点击关闭/打开所有配置</summary> 
  <br/>


- [打包分析](./config/BundleAnalyzerPlugin.js)
- [开启gzip](./config/CompressionWebpackPlugin.js)
- [dll-plugin 配置](./config/DllPlugin.js)
- [EnvironmentPlugin 定义通用变量](./config/EnvironmentPlugin.js)
- [fork-ts-checher 检查ts类型](./config/ForkTsChecker.js)
- [friendly-errors-webpack-plugin 友好错误提示](./config/FriendlyErrorsWebpackPlugin.js)
- [html-webpack-plugin 生成html](./config/HtmlWebpackPlugin.js)
- [mini-css-extract-plugin 配置](./config/MiniCssExtractPlugin.js)
- [别名配置](./config/alias.js)
- [加载资源 images、svg、media、fonts](./config/assets.js)
- [babel-loader 配置](./config/babelLoader.js)
- [基础配置](./config/base.js)
- [cache-loader 配置（webpack 5 弃用）](./config/cacheLoader.js)
- [CaseSensitivePaths 严格区分大小写](./config/caseSensitivePaths.js)
- [eslint-loader 配置](./config/eslintLoader.js)
- [提取 manifest](./config/manifest.js)
- [optimization 优化配置](./config/optimization.js)
- [样式表配置](./config/style.js)
- [stylelint 配置](./config/styleLintPlugin.js)
- [设置 style 全局变量](./config/styleResourcesLoader.js)
- [多线程配置](./config/threadLoader.js)
- [tslint 配置](./config/tslintPlugin.js)

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
   */
  return {
    entry: 'src/main.js',
    output: 'dist',
    publicPath: '/common/',
    port: 8888,
    env: {
      MY_ENV: 'my-env'
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
    chainWebpack(config) {
    }
  }
}

```

</details>  

