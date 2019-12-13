## 课题 05: 手写一个 loader，实现可选链

本章内容

1. <a href="#5_1">什么是 webpack loader</a>
2. <a href="#5_2">可选链介绍</a>
3. <a href="#5_3">loader 实现可选链</a>

### <a name="5_1">什么是 webpack loader</a>

`webpack loader` 是 `webpack` 为了处理各种类型文件的一个中间层，`webpack` 本质上就是一个 `node` 模块，它不能处理 `js` 以外的文件，那么 `loader` 就帮助 `webpack` 做了一层转换，将所有文件都转成字符串，你可以对字符串进行任意操作/修改，然后返回给 `webpack` 一个包含这个字符串的对象，让 `webpack` 进行后面的处理。如果把 `webpack` 当成一个垃圾工厂的话，那么 `loader` 就是这个工厂的垃圾分类！

### <a name="5_2">可选链介绍</a>

这里并不是纯粹意义上的可选链，因为 `babel` 跟 `ts` 都已经支持了，我们也没有必要去写一个完整的可选链，只是来加深一下对 `loader` 的理解， `loader` 在工作当中能帮助我们做什么？

**`用途`** 当我们访问一个对象属性时不必担心这个对象是 `undefined` 而报错，导致程序不能继续向下执行

**`解释`** 在 `?` 之前的所有访问链路都是合法的，不会产生报错

```js
const obj = {
  foo: {
    bar: {
      baz: 2
    }
  }
};

console.log(obj.foo.bar?.baz); // 2
// 被转成 obj && obj.foo && obj.foo.bar && obj.foo.bar.baz
console.log(obj.foo.err?.baz); // undefined
// 被转成 obj && obj.foo && obj.foo.err && obj.foo.err.baz
```

### <a name="5_3">loader 实现可选链</a>

配置 loader，options-chain-loader

config/OptionsChainLoader.js

```js
module.exports = (config, resolve) => {
  const baseRule = config.module.rule("js").test(/.js|.tsx?$/);
  const normalRule = baseRule.oneOf("normal");
  return () => {
    normalRule.use("options-chain").loader(resolve("options-chain-loader"));
  };
};
```

其实就是正则替换，`loader` 将整个文件全部转换成字符串，`content` 就是整个文件的内容，对 `content` 进行修改，修改完成后再返回一个新的 `content` 就完成了一个 `loader` 转换。是不是很简单？

下面的操作意思就是，我们匹配 `obj.foo.bar?.` 并把它转成 `obj && obj.foo && obj.foo.bar && obj.foo.bar.`

options-chain-loader.js

```js
module.exports = function(content) {
  return content.replace(new RegExp(/([\$_\w\.]+\?\.)/, "g"), function(res) {
    let str = res.replace(/\?\./, "");
    let arrs = str.split(".");
    let strArr = [];
    for (let i = 1; i <= arrs.length; i++) {
      strArr.push(arrs.slice(0, i).join("."));
    }
    let compile = strArr.join("&&");
    const done = compile + "&&" + str + ".";
    return done;
  });
};
```
