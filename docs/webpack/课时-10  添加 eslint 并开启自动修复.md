## 课题 10：添加 eslint 并开启自动修复

本章概要

- <a href="#10_1">抽离 cwd 层，职能单一化</a>
- <a href="#10_2">配置 eslint-loader</a>
- <a href="#10_3">eslint 自动修复功能</a>
- <a href="#10_4">添加脚手架命令</a>
- <a href="#10_5">使用编译器自动修复</a>
- <a href="#10_6">代码提交检查（lint-staged）</a>

### <a name="10_1">抽离 cwd 层，职能单一化</a>

目的：让职能更加清晰，每一层只做一件事情，使用标准化的 api 去处理同类逻辑

- PluginAPI 处理脚手架插件逻辑
- CommandAPI 处理脚手架命令行逻辑
- cwd 抽离 command 层

```bash
└── api
   │── CommandAPI.js
   └── PluginAPI.js
└── cwd
   │── build:ssr.js
   │── build.js
   │── dev.js
   │── dll.js
   │── lint.js
   └── ssr:server.js
```

### <a name="10_2">配置 eslint-loader</a>

配置 eslint-loader，在 webpack-box dev 时会检测 eslint 规则，如果有报错会显示在控制台上

```js
config.module
  .rule("eslint")
  .pre()
  .exclude.add(/node_modules/)
  .end()
  .test(/\.(vue|(j)sx?)$/)
  .use("eslint-loader")
  .loader(require.resolve("eslint-loader"))
  .options({
    extensions,
    cache: true,
    cacheIdentifier,
    emitWarning: allWarnings,
    emitError: allErrors,
    eslintPath: path.dirname(
      resolveModule("eslint/package.json", cwd) ||
        resolveModule("eslint/package.json", __dirname)
    ),
    formatter: loadModule("eslint/lib/formatters/codeframe", cwd, true)
  });
```

### <a name="10_3">eslint 自动修复功能</a>

当我们项目改变某一个规则时，我们项目中都会出现大量的错误，我们肯定不希望手动一个个去修改，所以我们需要使用 eslint 的自动修复的功能，它能够帮助我们修复绝大数的错误，还有一些修复不了的我们再手动修复就可以了

这里写出了部分代码，更多细节可以在项目里面看

packages/eslint/lint.js

```js
const { CLIEngine } = loadModule("eslint", cwd, true) || require("eslint");
const config = Object.assign({
  extensions,
  fix: true,
  cwd
});
const engine = new CLIEngine(config);
const defaultFilesToLint = ["src", "tests", "*.js", ".*.js"].filter(pattern =>
  globby
    .sync(pattern, { cwd, absolute: true })
    .some(p => !engine.isPathIgnored(p))
);

const files = args._ && args._.length ? args._ : defaultFilesToLint;
const report = engine.executeOnFiles(files);
if (config.fix) {
  CLIEngine.outputFixes(report);
}
```

### <a name="10_4">添加脚手架命令</a>

我们希望通过命令行的形式去修复，`webpack-box lint eslint`，所以需要在 `cwd` 层添加命令行

cwd/lint.js

```js
module.exports = function(injectCommand, api) {
  injectCommand(function({ program, cleanArgs, boxConfig }) {
    program
      .command("lint [type]")
      .description("修复lint")
      .action(async (name, cmd) => {
        const options = cleanArgs(cmd);
        const args = Object.assign(options, { name }, boxConfig);
        require("../build/lint")(args, api);
      });
  });
};
```

这样我们可以使用 `webpack-box lint eslint` 去修复大部分的错误了，去试一下吧～

### <a name="10_5">使用编译器自动修复</a>

当然我们执行 `webpack-box lint eslint` 命令时可以去修复一些错误，但是当我们写代码时希望编译器能够帮助我们自动修改，而不是等到代码写完了才去校验，这样会给我们带来二次麻烦，甚至会出现修复不了的问题。

所以我们使用 `vscode` 的 `eslint` 插件来帮助我们实现吧

首先您必须使用的编译器是 vscode，当然其它的编译器也可以，但是我们这里只讲 vscode 的配置。

您安装了 eslint 插件后，需要在设置中设置 `"eslint.autoFixOnSave": true`，这样就可以在保存时自动修复 `eslint` 的错误了

当然您可能只在这个项目中使用了 `eslint`，而在其他项目中并不需要保存时修复

可以在根目录添加

```js
└── .vscode
   └── settings.json
```

放一份我自己的配置供大家参考

```json
{
  /*
   * @description 编译器配置
   * @param tabSize 默认tab为两个空格
   * @param formatOnSave 保存时自动修复
   */
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  /*
   * @description eslint 配置
   * @param alwaysShowStatus 配置
   * @param autoFixOnSave 保存时自动修复
   * @param validate 在vue中添加错误提示
   */
  "eslint.alwaysShowStatus": true,
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  /*
   * @description tslint 配置
   * @param autoFixOnSave 保存时自动修复
   * @param alwaysShowRuleFailuresAsWarnings 所有特征都是用 Warnings
   */
  "tslint.autoFixOnSave": true,
  "tslint.alwaysShowRuleFailuresAsWarnings": true,
  /*
   * @description stylelint 配置
   * @param autoFixOnSave 保存时自动修复
   */
  "stylelint.autoFixOnSave": true,
  /*
   * @description vetur 配置
   */
  "vetur.format.defaultFormatter.html": "prettier",
  "vetur.format.defaultFormatterOptions": {
    "prettier": {
      "semi": false,
      "singleQuote": true
    }
  },
  /*
   * @description 配置编辑器设置以覆盖某种语言
   */
  "[typescript]": {
    // "editor.defaultFormatter": "esbenp.prettier-vscode"
    "editor.defaultFormatter": "eg2.tslint"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "eg2.tslint"
  },
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### <a name="10_6">代码提交检查（lint-staged）</a>

上述的操作都是我们理想状态下的检测跟修复，但是有时还会遇到意外的情况，并没有 lint 代码就提交了，这样会导致可能出现问题，所以我们需要在提交代码前进行一次代码检验

在 package.json 中添加 lint-staged，在代码提交时会先执行 lint，lint 通过之后才能提交成功

package.json

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx}": ["webpack-box lint eslint", "git add"]
  }
}
```
