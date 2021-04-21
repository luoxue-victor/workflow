# rollup-box

- rollup-box 集成大量的 rollup 插件，当你想要使用 rollup 打包时，你不需要考虑要使用哪些插件
- 可以使用 rollup 构建一个打包器可以快速构建一个或多个文件的打包。支持 js/ts/less/sass/jsx/tsx 等
- [rollup 学习](../../learn/rollup)
### 安装

```sh
npm i @pkb/rollup-box -g # 全局安装/本地安装

rollup-box build # 构建项目
rollup-box watch # 开发模式
```

JavaScript API

```js
const { builder, plugins, MODE } = require('@pkb/rollup-box')
const options = {
  input: {...}
  output: {...}
}
// 所有插件都在 plugins 中，可以自主选择使用哪些插件，或者添加一些插件
// MODE 提供两种模式 WATCH BUILD
// options 是 rollup 配置，可默认不填
builder(MODE.WATCH, plugins, options)
```

### 支持的插件

{{plugins}}

### rollup-box 配置

```js
const path = require('path')

function resolve(dir) {
  return path.join(process.cwd(), dir)
}

module.exports = function (config) {
  return {
    input: {
      input: path.join(process.cwd(), 'src', 'index.ts'),
    },
    output: {
      dir: 'dist',
      format: 'es',
      sourcemap: true
    },
    dev: {
      port: 6002,
      host: '::', // ipv6
      dirs: ['dist'],
      basePath: '/',
      openPage: './index.html',
      contentBase: './dist',
    },
    alias: [
      { find: '@src', replacement: resolve('src') },
    ]
  }
}
```
