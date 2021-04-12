## 课题 06：webpack 编译优化

本章内容

1. <a href="#6_1">cache-loader</a>
2. <a href="#6_2">DllPlugin</a>
3. <a href="#6_3">threadLoader</a>

### <a name="6_1">cache-loader</a>

`cache-loader` 主要是将打包好的文件缓存在硬盘的一个目录里，一般存在 `node_modules/.cache` 下，当你再次 `build` 的时候如果此文件没有修改就会从缓存中读取已经编译过的文件，只有有改动的才会被编译，这样就大大降低了编译的时间。尤其是项目越大时越明显。

此项目使用前后数据对比 3342ms --> 2432ms 效果还是比较明显

这里只对 babel 加入了 cache-loader，因为我们的 ts/js 都是由 babel 进行编译的，不需要对 ts-loader 缓存（我们也没有用到）

config/cacheLoader.js

```js
module.exports = (config, resolve) => {
  const baseRule = config.module.rule("js").test(/.js|.tsx?$/);
  const babelPath = resolve("babel.js");
  const babelConf = require(babelPath);
  const version = require(resolve("node_modules/@babel/core/package.json"))
    .version;
  return () => {
    baseRule.exclude
      .add(filepath => {
        // 不缓存 node_modules 下的文件
        return /node_modules/.test(filepath);
      })
      .end()
      .use("cache-loader")
      .loader("cache-loader")
      .options({
        // 缓存位置
        cacheDirectory: resolve("node_modules/.cache/babel")
      });
  };
};
```

### <a name="6_2">DllPlugin</a>

DllPlugin 是将第三方长期不变的包与实际项目隔离开来并分别打包，当我们 build 时再将已经打包好的 dll 包引进来就 ok 了

我提取了两个包 vue、react，速度差不多提升了 200ms，从 2698ms 到 2377ms

#### 打包 dll

build/dll.js

```js
const path = require("path");
const dllPath = path.join(process.cwd(), "dll");
const Config = require("webpack-chain");
const config = new Config();
const webpack = require("webpack");
const rimraf = require("rimraf");
const ora = require("ora");
const chalk = require("chalk");
const BundleAnalyzerPlugin = require("../config/BundleAnalyzerPlugin")(config);

BundleAnalyzerPlugin();
config
  .entry("dll")
  .add("vue")
  .add("react")
  .end()
  .set("mode", "production")
  .output.path(dllPath)
  .filename("[name].js")
  .library("[name]")
  .end()
  .plugin("DllPlugin")
  .use(webpack.DllPlugin, [
    {
      name: "[name]",
      path: path.join(process.cwd(), "dll", "manifest.json")
    }
  ])
  .end();

rimraf.sync(path.join(process.cwd(), "dll"));
const spinner = ora("开始构建项目...");
spinner.start();

webpack(config.toConfig(), function(err, stats) {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + "\n\n"
  );

  if (stats.hasErrors()) {
    console.log(chalk.red("构建失败\n"));
    process.exit(1);
  }
  console.log(chalk.cyan("build完成\n"));
});
```

### 将 dll 包合并

```js
const webpack = require("webpack");

module.exports = (config, resolve) => {
  return () => {
    config.plugin("DllPlugin").use(webpack.DllReferencePlugin, [
      {
        context: process.cwd(),
        manifest: require(resolve("dll/manifest.json"))
      }
    ]);
  };
};
```

## <a name="6_3">threadLoader</a>

测试效果变差了 😅，线程数越小编译速度越快

config/threadLoader.js

```js
module.exports = (config, resolve) => {
  const baseRule = config.module.rule("js").test(/.js|.tsx?$/);
  return () => {
    const useThreads = true;
    if (useThreads) {
      const threadLoaderConfig = baseRule
        .use("thread-loader")
        .loader("thread-loader");
      threadLoaderConfig.options({ workers: 3 });
    }
  };
};
```

---
