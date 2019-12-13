## 课题 09：webpack 构建 ssr

ssr 就是服务端渲染，做 ssr 的好处就是为了处理 spa 的不足，比如 seo 优化，服务端缓存等问题。

今天主要用 react 的 ssr 来做一个简单的实例，让大家更清晰的入门

本章概要

- <a href="#8_1">创建 box build:ssr</a>
- <a href="#8_1">编译 ssr</a>
- <a href="#8_1">编译 jsx 语法</a>
- <a href="#8_1">入口区分服务端/客户端</a>
- <a href="#8_1">服务端渲染</a>
- <a href="#8_1">小结</a>

### <a name="8_1">创建 box build:ssr</a>

老规矩，先来一个 `box build:ssr` 命令让程序可以执行

执行 `box build:ssr` 会调用 `build/ssr` 执行编译

```js
program
  .usage("<command> [options]")
  .version(packageConfig.version)
  .command("build:ssr [app-page]")
  .description(`服务端渲染`)
  .action(async (name, cmd) => {
    const options = cleanArgs(cmd);
    const args = Object.assign(options, { name }, boxConf);
    if (lock) return;
    lock = true;
    require("../build/ssr")(args);
  });
```

### <a name="8_1">编译 ssr</a>

与其他的编译没有什么区别，值得住的是

- target 指定为 umd 模式
- globalObject 为 this
- 入口改为 ssr.jsx

```js
.libraryTarget('umd')
.globalObject('this')
```

build/ssr.js

```js
module.exports = function(options) {
  const path = require("path");
  const Config = require("webpack-chain");
  const config = new Config();
  const webpack = require("webpack");
  const rimraf = require("rimraf");
  const ora = require("ora");
  const chalk = require("chalk");
  const PATHS = {
    build: path.join(process.cwd(), "static"),
    ssrDemo: path.join(process.cwd(), "src", "ssr.jsx")
  };

  require("../config/babelLoader")({ config, tsx: true })();
  require("../config/HtmlWebpackPlugin")({
    config,
    options: {
      publicPath: "/",
      filename: "client.ssr.html"
    }
  })();

  config
    .entry("ssr")
    .add(PATHS.ssrDemo)
    .end()
    .set("mode", "development") //  production
    .output.path(PATHS.build)
    .filename("[name].js")
    .libraryTarget("umd")
    .globalObject("this")
    .library("[name]")
    .end();

  rimraf.sync(path.join(process.cwd(), PATHS.build));
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
};
```

### <a name="8_1">编译 jsx 语法</a>

因为我们是用 react 写的，避免不了会用到 jsx 语法，所以我们需要在 `babel-loader` 中使用 `@babel/preset-react`

```bash
npm i @babel/preset-react -D
```

config/babelLoader.js

```js
if (tsx) {
  babelConf.presets.push("@babel/preset-react");
}
```

### <a name="8_1">入口区分服务端/客户端</a>

区分服务端跟客户端分别渲染

```js
const React = require("react");
const ReactDOM = require("react-dom");

const SSR = <div onClick={() => alert("hello")}>Hello world</div>;

if (typeof document === "undefined") {
  console.log("在服务端渲染");
  module.exports = SSR;
} else {
  console.log("在客户端渲染");
  const renderMethod = !module.hot ? ReactDOM.render : ReactDOM.hydrate;
  renderMethod(SSR, document.getElementById("app"));
}
```

### <a name="8_1">服务端渲染</a>服务端渲染

- 将打包出来的 static 文件夹作为一个服务
- 访问 http://127.0.0.1:8080，进入服务端渲染的页面
- 再执行一遍 ssr.js 进行事件绑定

```js
module.exports = function(options) {
  const express = require("express");
  const { renderToString } = require("react-dom/server");
  const chalk = require("chalk");

  const SSR = require("../static/ssr");
  const port = process.env.PORT || 8080;

  server(port);

  function server(port) {
    const app = express();
    app.use(express.static("static"));
    app.get("/", (req, res) =>
      res.status(200).send(renderMarkup(renderToString(SSR)))
    );

    const empty = "    ";
    const common = `App running at:
      - Local: http://127.0.0.1:${port}\n`;
    console.log(chalk.cyan("\n" + empty + common));

    app.listen(port, () => process.send && process.send("online"));
  }

  function renderMarkup(html) {
    return `<!DOCTYPE html>
  <html>
    <head>
      <title>Webpack SSR Demo</title>
      <meta charset="utf-8" />
    </head>
    <body>
      <div id="app">${html}</div>
      <script src="./ssr.js"></script>
    </body>
  </html>`;
  }
};
```

### <a name="8_1">小结</a>

至此 ssr 已经结束了，其实所有看起来很高大上的技术都是从一点一滴积累起来的，只要我们明白原理，你也能做出更优秀的框架

---
