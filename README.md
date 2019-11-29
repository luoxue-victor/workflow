# 一步步从零开始 webpack 搭建一个大型项目

> 很多人都或多或少使用过 webpack，但是很少有人能够系统的学习 webpack 配置，遇到错误的时候就会一脸懵，不知道从哪查起？性能优化时也不知道能做什么，网上的优化教程是不是符合自己的项目？等一系列问题！本文从最基础配置一步步到一个完善的大型项目的过程。让你对 webpack 再也不会畏惧，让它真正成为你的得力助手！

本文从下面几个课题来实现

- 课题 1：[初探 webpack？探究 webpack 打包原理](./docs/课时1.md)。
- 课题 2：[搭建开发环境跟生产环境](./docs/课时2.md)
- 课题 3：[基础配置之loader](./docs/课时3.md)
- 课时 4：[webpack性能优化](./docs/课时4.md)
- 课时 5：[手写loader实现可选链](./docs/课时5.md)
- 课时 6：[webpack编译优化](./docs/课时6.md)
- 课时 7：[多页面配置](./docs/课时7.md)
- 课时 8：[手写一个webpack插件](./docs/课时8.md)
- 课时 9：[构建 ssr](./docs/课时9.md)

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
使用

```bash
npm run build --report # 开启打包分析
```

扩展配置 

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
   * @param {string} port 
   */
  return {
    entry: 'src/main.js',
    output: 'dist',
    publicPath: '/common/',
    port: 8888,
    dll: {
      venders: ['vue', 'react']
    },
    pages: {
      index: {
        entry: 'src/main.js',
        template: 'public/index.html',
        filename: 'index.html',
      },
      index2: {
        entry: 'src/main.js',
        template: 'public/index2.html',
        filename: 'index2.html',
      }
    },
    chainWebpack(config) {
    }
  }
}
```