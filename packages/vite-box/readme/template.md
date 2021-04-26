# vite-box

- vite-box 开箱即用的 vite 封装
- 包含多个插件，通过配置来构建项目
- [vite 学习](../../learn/vite)

### 安装

```sh
npm i @pkb/vite-box -g # 全局安装/本地安装

vite-box build  # 构建项目
vite-box server # 开发模式
```

JavaScript API

```js
const { createServer, build, getPlugins } = require('@pkb/vite-box')

createServer({ plugins: getPlugins() })
build(/* config */)
```

### 支持的插件

{{plugins}}

### vite-box 配置

与 vite 一致 https://cn.vitejs.dev/config/

vite-box.config.js

```js
// 默认配置
module.exports = function () {
  return {
    configFile: false,
    root: process.cwd(),
    clearScreen: true,
    base: './',
    root: './',
    server: {
      port: 7777
    },
    plugins: [],
    build: {
      target: 'es2015',
      minify: 'terser',
      manifest: false,
      sourcemap: false,
      outDir: 'dist',
      rollupOptions: {},
    }
  }
}
```
