# webpack 工程师的自我修养

> 本来想要做一个大型项目的 webpack 教程，但是我发现还可以做更多的事情，所以这里我要将这个项目做成 webpack 手册，您可以来这里找到任何想要的 webpack 配置

本文从下面几个课题来实现


## collapsible markdown?

<details>
<summary>点击查看课题</summary>

- 课题 1：[初探 webpack？探究 webpack 打包原理](./docs/课时1.md)。
- 课题 2：[搭建开发环境跟生产环境](./docs/课时2.md)
- 课题 3：[基础配置之 loader](./docs/课时3.md)
- 课时 4：[webpack 性能优化](./docs/课时4.md)
- 课时 5：[手写 loader 实现可选链](./docs/课时5.md)
- 课时 6：[webpack 编译优化](./docs/课时6.md)
- 课时 7：[多页面配置](./docs/课时7.md)
- 课时 8：[手写一个 webpack 插件](./docs/课时8.md)
- 课时 9：[构建 ssr 项目模型](./docs/课时9.md)
- 课时 10：[添加 eslint 并自动修复](./docs/课时10.md)
- 课时 11：[添加 stylelint 并自动修复](./docs/课时11.md)
- 课时 12：[添加 tslint 并自动修复](./docs/课时12.md)
- 课时 13：[配置别名](./docs/课时13.md)

</details>

## 脚手架

```js
npm i -g webpack-box
```

### 使用

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

###扩展配置

box.config.js

```js
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
   */
  return {
    entry: 'src/main.js',
    output: 'dist',
    publicPath: '/common/',
    port: 8888,
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
    dll: {
      venders: ['react']
    },
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
