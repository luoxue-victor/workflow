## 课题 12：添加 tslint

本章概要

- <a href="#12_1">配置插件</a>
- <a href="#12_2">添加规则</a>
- <a href="#12_3">自动修复功能</a>
- <a href="#12_4">提交检查</a>

### <a name="12_1">配置插件</a>

config/tslintPlugin.js

```js
module.exports = ({
  config,
  options: { tslint: { lintOnSave = false, useThreads = false } = {} },
  api
}) => {
  const fs = require("fs");
  return () => {
    config.plugin("fork-ts-checker").tap(([options]) => {
      options.tslint =
        lintOnSave !== false && fs.existsSync(api.resolve("tslint.json"));
      options.formatter = "codeframe";
      options.checkSyntacticErrors = useThreads;
      return [options];
    });
  };
};
```

### <a name="12_2">添加规则</a>

tslint.json

```json
{
  "defaultSeverity": "warning",
  "extends": ["tslint:recommended"],
  "linterOptions": {
    "exclude": ["node_modules/**"]
  },
  "rules": {
    "max-classes-per-file": [true, 5, "exclude-class-expressions"],
    "quotemark": [true, "single"],
    "semicolon": [true, "never"],
    "indent": [true, "spaces", 2],
    "ordered-imports": false,
    "object-literal-sort-keys": false,
    "no-consecutive-blank-lines": false,
    "disable-next-line": false,
    "only-arrow-functions": false,
    "radix": false,
    "class-name": false,
    "eofline": false,
    "no-unused-expression": false,
    "no-console": false,
    "trailing-comma": false,
    "interface-name": false
  }
}
```

### <a name="12_3">自动修复功能</a>

```js
const { done } = require("@vue/cli-shared-utils");

module.exports = function lint({ args = {}, api, silent }) {
  const options = {
    fix: args.fix !== false,
    formatter: args.format || "codeFrame",
    formattersDirectory: args["formatters-dir"],
    rulesDirectory: args["rules-dir"]
  };

  const program = tslint.Linter.createProgram(api.resolve("tsconfig.json"));
  const linter = new tslint.Linter(options, program);

  const updateProgram = linter.updateProgram;
  linter.updateProgram = function(...args) {
    updateProgram.call(this, ...args);
    patchProgram(this.program);
  };

  const tslintConfigPath = tslint.Configuration.CONFIG_FILENAMES.map(filename =>
    api.resolve(filename)
  ).find(file => fs.existsSync(file));

  const config = tslint.Configuration.findConfiguration(tslintConfigPath)
    .results;

  const lint = file => {
    const filePath = api.resolve(file);
    const isVue = isVueFile(file);
    patchWriteFile();
    linter.lint(filePath, "", isVue ? vueConfig : config);
    restoreWriteFile();
  };

  const files =
    args._ && args._.length
      ? args._
      : [cwd + "/src/**/*.ts", cwd + "/src/**/*.vue", cwd + "/src/**/*.tsx"];

  return globby(files, { cwd }).then(files => {
    files.forEach(lint);
    if (silent) return;
    const result = linter.getResult();
    if (result.output.trim()) {
      process.stdout.write(result.output);
    } else if (result.fixes.length) {
      const f = new tslint.Formatters.ProseFormatter();
      process.stdout.write(f.format(result.failures, result.fixes));
    } else if (!result.failures.length) {
      done("tslint 没有发现错误.\n");
    }

    if (result.failures.length && !args.force) {
      process.exitCode = 1;
    }
  });
};
```

### <a name="12_4">提交检查</a>

```json
{
  "lint-staged": {
    "*.{vue,htm,html,css,sss,less,scss}": [
      "webpack-box lint stylelint",
      "git add"
    ],
    "*.{ts,tsx}": ["webpack-box lint tslint", "git add"],
    "*.{js,jsx}": ["webpack-box lint eslint", "git add"]
  }
}
```
