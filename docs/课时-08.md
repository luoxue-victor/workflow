## 课题 08：手写一个 webpack plugin

如果把 webpack 当成一个垃圾工厂，loader 就是垃圾分类，将所有垃圾整理好交给 webpack。plugin 就是如何去处理这些垃圾。

webpack 插件写起来很简单，就是你要知道各种各样的钩子在什么时候触发，然后你的逻辑写在钩子里面就 ok 了

- `apply` 函数是 webpack 在调用 plugin 的时候执行的，你可以认为它是入口
- `compiler` 暴露了和 webpack 整个生命周期相关的钩子
- `Compilation` 暴露了与模块和依赖有关的粒度更小的事件钩子

**本节概要**

- <a href="#8_1">实现一个 CopyPlugin</a>
- <a href="#8_2">使用</a>

### <a name="8_1">实现一个 CopyPlugin</a>

我们今天写一个 copy 的插件，在 webpack 构建完成之后，将目标目录下的文件 copy 到另一个目录下

```js
const fs = require("fs-extra");
const globby = require("globby");

class CopyDirWebpackPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    const opt = this.options;
    compiler.plugin("done", stats => {
      if (process.env.NODE_ENV === "production") {
        (async () => {
          const toFilesPath = await globby([`${opt.to}/**`, "!.git/**"]);
          toFilesPath.forEach(filePath => fs.removeSync(filePath));
          const fromFilesPath = await globby([`${opt.from}/**`]);
          fromFilesPath.forEach(fromPath => {
            const cachePath = fromPath;
            fromPath = fromPath.replace("dist", opt.to);
            const dirpaths = fromPath.substring(0, fromPath.lastIndexOf("/"));
            fs.mkdirpSync(dirpaths);
            fs.copySync(cachePath, fromPath);
          });
          console.log(`  完成copy ${opt.from} to ${opt.to}`);
        })();
      }
    });
  }
}

module.exports = CopyDirWebpackPlugin;
```

### <a name="8_2">使用</a>

将打包出来的 dist 目录下的内容 copy 到 dist2 目录下

```js
const CopyPlugin = require("../webapck-plugin-copy");

module.exports = ({ config }) => {
  return () => {
    config.plugin("copy-dist").use(CopyPlugin, [
      {
        from: "dist",
        to: "dist2"
      }
    ]);
  };
};
```

---
