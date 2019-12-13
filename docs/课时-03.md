## 课题 03：基础配置（loder，ts、babel、css、less、sass、postcss）等

本章提要：

- <a href="#3_1">配置 babel</a>
- <a href="#3_2">使用 babel 配置 ts</a>
- <a href="#3_3">ts 静态类型检查</a>
- <a href="#3_4">友好错误提示插件</a>
- <a href="#3_5">配置样式，style，css、less、sass、postcss 等</a>
- <a href="#3_6">postcss 配置</a>
- <a href="#3_7">编译前后 css 对比</a>
- <a href="#3_8">配置 autoprefixer</a>
- <a href="#3_9">开启 source map</a>

### 目录

增加以下文件

```js
│──── config                // 配置目录
│   │── babelLoader.js      // babel-loader 配置
│   │── ForkTsChecker.js    // ts 静态检查
│   │── FriendlyErrorsWebpackPlugin.js // 友好错误提示
│   └── style
│──── src                   // 开发目录
│   │── style
│   │  │── app.css
│   │  │── index.less       // 测试 less
│   │  │── index.scss       // 测试 sass
│   │  └── index.postcss    // 测试 postcss
│   └── ts
│     └── index.ts          // 测试 ts
│── babel.js
│── postcss.config.js       // postcss 配置
│── tsconfig.json           // ts 配置
└──── dist                  // 打包后的目录
   │── app.bundle.js
   │── app.css
   └── index.html
```

### <a name="3_1">配置 babel</a>

config/babelLoader.js

```js
module.exports = (config, resolve) => {
  const baseRule = config.module.rule("js").test(/.js│.tsx?$/);
  const babelPath = resolve("babel.js");
  const babelConf = require(babelPath);
  const version = require(resolve("node_modules/@babel/core/package.json"))
    .version;
  return () => {
    baseRule
      .use("babel")
      .loader(require.resolve("babel-loader"))
      .options(babelConf({ version }));
  };
};
```

### <a name="3_2">使用 babel 配置 ts</a>

这里我们使用 `babel` 插件 `@babel/preset-typescript` 将 `ts` 转成 `js，并使用` `ForkTsCheckerWebpackPlugin`、`ForkTsCheckerNotifierWebpackPlugin` 插件进行错误提示。

babel.js

```js
module.exports = function(api) {
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            chrome: 59,
            edge: 13,
            firefox: 50,
            safari: 8
          }
        }
      ],
      [
        "@babel/preset-typescript",
        {
          allExtensions: true
        }
      ]
    ],
    plugins: [
      "@babel/plugin-transform-typescript",
      "transform-class-properties",
      "@babel/proposal-object-rest-spread"
    ]
  };
};
```

### <a name="3_3">ts 静态类型检查</a>

```js
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");

module.exports = (config, resolve) => {
  return () => {
    config.plugin("ts-fork").use(ForkTsCheckerWebpackPlugin, [
      {
        // 将async设为false，可以阻止Webpack的emit以等待类型检查器/linter，并向Webpack的编译添加错误。
        async: false
      }
    ]);
    // 将TypeScript类型检查错误以弹框提示
    // 如果fork-ts-checker-webpack-plugin的async为false时可以不用
    // 否则建议使用，以方便发现错误
    config.plugin("ts-notifier").use(ForkTsCheckerNotifierWebpackPlugin, [
      {
        title: "TypeScript",
        excludeWarnings: true,
        skipSuccessful: true
      }
    ]);
  };
};
```

### <a name="3_4">友好错误提示插件</a>

config/FriendlyErrorsWebpackPlugin.js

```js
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

module.exports = (config, resolve) => {
  return () => {
    config.plugin("error").use(FriendlyErrorsWebpackPlugin);
  };
};
```

### <a name="3_5">配置样式，style，css、less、sass、postcss 等</a>

```js
module.exports = (config, resolve) => {
  const createCSSRule = (lang, test, loader, options = {}) => {
    const baseRule = config.module.rule(lang).test(test);
    const normalRule = baseRule.oneOf("normal");
    normalRule
      .use("extract-css-loader")
      .loader(require("mini-css-extract-plugin").loader)
      .options({
        hmr: process.env.NODE_ENV === "development",
        publicPath: "/"
      });
    normalRule
      .use("css-loader")
      .loader(require.resolve("css-loader"))
      .options({});
    normalRule.use("postcss-loader").loader(require.resolve("postcss-loader"));
    if (loader) {
      const rs = require.resolve(loader);
      normalRule
        .use(loader)
        .loader(rs)
        .options(options);
    }
  };

  return () => {
    createCSSRule("css", /\.css$/, "css-loader", {});
    createCSSRule("less", /\.less$/, "less-loader", {});
    createCSSRule("scss", /\.scss$/, "sass-loader", {});
    createCSSRule("postcss", /\.p(ost)?css$/);
  };
};
```

### <a name="3_6">postcss 配置</a>

```js
module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      unitToConvert: "px",
      viewportWidth: 750,
      unitPrecision: 5,
      propList: ["*"],
      viewportUnit: "vw",
      fontViewportUnit: "vw",
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [],
      landscape: false,
      landscapeUnit: "vw",
      landscapeWidth: 568
    }
  }
};
```

### <a name="3_7">编译前后 css 对比</a>

src/style/index.less

```less
/* index.less */
.test {
  width: 300px;
}
```

dist/app.css

```css
/* index.css */
.test {
  width: 36.66667vw;
  height: 26.66667vw;
  color: red;
  background-color: orange;
}

/* app.css */
.test {
  font-size: 8vw;
}

/* index.less */
.test {
  width: 40vw;
}

/* index.scss */
.test {
  height: 40vw;
}

/* index.postcss */
.test {
  background: green;
  height: 26.66667vw;
}
```

### <a name="3_8">配置 autoprefixer</a>

自动添加 css 前缀

postcss.config.js

```js
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "> 1%",
        "last 3 versions",
        "iOS >= 8",
        "Android >= 4",
        "Chrome >= 40"
      ]
    }
  }
};
```

#### 转换前

```css
/* index.css */
.test {
  width: 200px;
  height: 200px;
  color: red;
  display: flex;
  background-color: orange;
}
```

#### 转换后

```css
/* index.css */
.test {
  width: 26.66667vw;
  height: 26.66667vw;
  color: red;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  background-color: orange;
}
```

### <a name="3_9">开启 source map</a>

```js
config.devtool("cheap-source-map");
```

```js
└── dist
  │── app.bundle.js
  │── app.bundle.js.map
  │── app.css
  │── app.css.map
  └── index.html
```

在源文件下会有一行注释，证明开启了 sourcemap

```js
/*# sourceMappingURL=app.css.map*/
```

──-
