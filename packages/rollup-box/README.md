# rollup-box

rollup-box 集成大量的 rollup 插件，当你想要使用 rollup 打包时，你不需要考虑要使用哪些插件。使用 rollup 构建一个打包器可以快速构建一个或多个文件的打包。支持 js/ts/less/sass/jsx/tsx 等

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

- [@rollup/plugin-alias](./config/alias.js) 定义别名
- [@rollup/plugin-auto-install](./config/auto-install.js) 自动安装依赖
- [@rollup/plugin-graphql](./config/graphql.js) 可将.gql / .graphql文件转换为ES6模块
- [@rollup/plugin-html](./config/html.js) 会在输出目录输出一个html页面，方便测试
- [@rollup/plugin-image](./config/image.js) 将图片转成 base64 打包在js中
- [rollup-plugin-terser](./config/terser.js) 代码压缩
- [@rollup/plugin-typescript](./config/typescript.js) 支持ts

