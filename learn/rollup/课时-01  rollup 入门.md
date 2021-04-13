## 什么是 rollup

Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序

一般我们要封装一个库，提供给其他人使用，我们一般会使用 rollup 进行打包。


### rollup 能做什么

能够对 js/ts/jsx/tsx/less/sass 等进行打包，能够构建一个更加干净的库，没有任何其他的依赖，构建出的产物也非常简洁


### rollup 入门

使用起来非常简单

node rollup.js

```js
// rollup.js
const rollup = require('rollup')

const = {
  input: path.join(process.cwd(), 'src', 'index.js'),
  plugins: [],
  output: {
    name: 'app',
    dir: 'dist',
    format: 'cjs'
  }
}

const bundle = await rollup.rollup(inputOptions)

// 会生成打包好的 code
const bundler = await bundle.generate(outputOptions);
// 将生成好的code，输出到一个文件或者文件夹中
const bundler = await bundle.write(outputOptions);
```
