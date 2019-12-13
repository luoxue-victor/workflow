## 课时 14：升级 webpack5

本章主要将项目升级到 webpack5，先踩一下坑。把踩坑的经过给大家分享一下。

webpack5 更像是一个黑盒了，好多之前必须要用插件来完成的工作，现在 webpack5 内部已经被集成了，开箱即用。webpack 最大的痛点就是配置太复杂，所以才出现了 webpack 工程师。webpack5 主要为了优化编译速度、更多的默认配置、更好的代码生成、为将来做铺垫。

本章概要

- <a href="#14_1">webpack5 做了哪些事情？</a>
- <a href="#14_2">升级 webpack5</a>
- <a href="#14_3">编译速度对比</a>
- <a href="#14_4">项目对应的改变</a>

### <a name="14_1">webpack5 做了哪些事情？</a>

- 使用长期缓存提升编译速度
- 使用更好的算法和默认值来改善长期缓存
- 通过更好的 Tree Shaking 和 Code Generation 来改善 bundle 大小
- 重构内部结构，在不引入任何重大更改的情况下实现 v4 的功能
- 通过引入重大更改来为将来的功能做准备，以使我们能够尽可能长时间地使用 v5

### <a name="14_2">升级 webpack5</a>

本教程可以通过脚手架一键升级/降级

```bash
webpack-box upgrade 5/4
```

主要升级了两个插件，其他使用到的模块都已经被兼容，`html-webpack-plugin` 插件因为涉及到热更新，目前热更新的 bug 还没有修复，所以大家切换到 webpack5 之后的第一次编译可以成功，但是保存后的编译会报错（这点我会持续关注，一旦修理立即更新版本）

```json
{
  "html-webpack-plugin": "^4.0.0-beta.11",
  "webpack": "^5.0.0-beta.9"
}
```

### <a name="14_3">编译速度对比</a>

```bash
webpack-box build index
```

Version: webpack `4.41.2`

以下是使用了 `cache-loader`

- 第一次 `4216ms`
- 第二次 `2781ms`
- 第三次 `2827ms`
- 第四次 `2797ms`

Version: webpack `5.0.0-beta.9`

使用了 `持久缓存`

- 第一次 `3567ms`
- 第二次 `2602ms`
- 第三次 `2609ms`
- 第四次 `2582ms`

可以看出来 `webpack5` 使用持久缓存的情况下比 `webpack4` 使用 cache-loader 的编译速度快了 `100ms ～ 200ms`，所以以后就没有必要使用 cache-loader，webpack5 提供了更好的算法跟更优秀的缓存方案

### <a name="14_4">webpack4 -> webpack5 的变化</a>

#### 1. cache-loader 不再需要

使用持久性缓存时，您不再需要缓存加载器。与 babel cacheDirectory 相同。

#### 2. html-webpack-plugin 问题

一些错误并修复 `error`

1. Cannot add property htmlWebpackPluginAlterChunks, object is not extensible

安装 4.x 版本可修复

```bash
npm i html-webpack-plugin@4.0.0-beta.11
```

2. Cannot read property 'get' of undefined

`未修复` 第一次编译生效，保存之后会报错，`webpack5` 对热更新进行了重写，导致 `html-webpack-plugin` 不兼容，[原因可查](https://github.com/jantimon/html-webpack-plugin/issues/1129)

#### 3. 动态加载的文件终于有名字了，不再是 id，而是改为项目路径的拼接

可以使用 optimization.chunkIds 进行修改

[点击看文档](https://webpack.js.org/configuration/optimization/#optimizationchunkids)

```js
module.exports = {
  //...
  optimization: {
    chunkIds: "named"
  }
};

// 链式修改
config.optimization.set("chunkIds", "natural");
```

![](./asset/14/import5.jpg)

#### 嵌套 tree-shaking

如下，在 webpack4 中 a、b 都会被打包进 bundle 中，webpack5 会对嵌套的无用代码也会删除掉，也就是说 b 并不会被打包进 bundle 中了，因为 b 并没有被使用到

```js
// inner.js
export const a = 1;
export const b = 2;

// module.js
import * as inner from "./inner";
export { inner };

// user.js
import * as module from "./module";
console.log(module.inner.a);
```

#### 内部模块 tree-shaking

webpack5 会检查都模块内部的方法是否被使用，如果没有被使用的话，那么会把模块内部调用的方法也会被删除

但是前提是你要知道这些代码是无副作用的，不然很有可能将你的代码删掉，比如你要写一个组件，而你库里并没有使用它，那么就有可能在打包的时候被 tree-shaking 了

使用它您需要在 `package.json` 中配置 `"sideEffects": false`，并且设置 `optimization.usedExports` 为 true

```js
// package.json
{
  "sideEffects": false
}

// config/optimization.js
config.optimization.usedExports(true);
```

`代码演示`

```js
import { something } from "./something";

function usingSomething() {
  return something;
}

export function test() {
  return usingSomething();
}
```

如果外部模块没有使用 test 方法的话，那么 usingSomething、something 也会在 bundle 中被删除

#### 改进代码生成

告诉 webpack webpack 生成代码的最大 EcmaScript 版本

`webpack4` 仅能支持到 ES5，`webpack5` 支持 ES5 跟 ES6

`ecmaVersion` 的取值范围 5 ~ 11 或 2009 ~ 2020，webpack5 默认采用最小值 5

```js
config.output.set("ecmaVersion", 6);
```

#### SplitChunks and Module Sizes

webpack5 可以根据不同类型的文件分别设置 splitChunks 打包的尺寸，默认情况下只针对 javascript 进行分离打包

```js
config.optimization.splitChunks({
  minSize: {
    javascript: 30000,
    style: 50000
  }
});
```

#### 持久缓存

webpack5 提供了两种缓存方式，一种是持久缓存将文件缓存在文件系统，另一种是缓存在内存里

```js
// type {filesystem | memory}
config.cache({
  type: "filesystem"
});
```

默认情况下，会被缓存在 `node_modules/.cache/webpack` 下，您可以通过 `cacheDirectory` 选项修改缓存目录

#### 其他

[webpack5 具体调整内容点这里](https://github.com/webpack/changelog-v5/blob/master/README.md)
