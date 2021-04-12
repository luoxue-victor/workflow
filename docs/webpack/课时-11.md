## 课题 11：添加 stylelint

本章概要

- <a href="#11_1">配置 stylelint standard 插件</a>
- <a href="#11_2">配置 stylelint 插件</a>
- <a href="#11_3">自动修复</a>
- <a href="#11_4">代码提交检查</a>

### <a name="11_1">配置 stylelint standard 插件</a>

使用 stylelint-config-standard 插件

.stylelintrc.js

```js
module.exports = {
  root: true,
  extends: "stylelint-config-standard"
};
```

### <a name="11_2">配置 stylelint 插件</a>

```js
module.exports = ({
  config,
  options: { stylelint: { lintOnSave = false, extensions } = {} },
  api
}) => {
  const StyleLintPlugin = require("stylelint-webpack-plugin");
  const CodeframeFormatter = require("stylelint-codeframe-formatter");
  const stylelint = [];
  return () => {
    config.plugin("stylelint").use(StyleLintPlugin, [
      Object.assign(
        {
          failOnError: lintOnSave === "error",
          files: ["src/**/*.{vue,htm,html,css,sss,less,scss}"],
          formatter: CodeframeFormatter
        },
        stylelint
      )
    ]);
  };
};
```

### <a name="11_3">自动修复</a>

```js
module.exports = async function lint({ api, args = {}, pluginOptions = {} }) {
  const cwd = api.resolve(".");

  const files =
    args._ && args._.length
      ? args._
      : [cwd + "/src/**/*.{vue,htm,html,css,sss,less,scss}"];
  if (args["no-fix"]) {
    args.fix = false;
    delete args["no-fix"];
  }

  const { formatter } = args;
  if (
    formatter &&
    typeof formatter === "string" &&
    !["json", "string", "verbose"].includes(formatter)
  ) {
    try {
      args.formatter = require(formatter);
    } catch (e) {
      delete args.formatter;
      if (typeof pluginOptions.formatter !== "function") {
        console.log(
          format(
            chalk`{bgYellow.black  WARN }`,
            chalk`${e.toString()}\n{yellow Invalid formatter}`
          )
        );
      }
    }
  }

  const options = Object.assign(
    {},
    {
      configBasedir: cwd,
      fix: true,
      files,
      formatter: CodeframeFormatter
    },
    pluginOptions,
    normalizeConfig(args)
  );

  try {
    const { errored, results, output: formattedOutput } = await stylelint.lint(
      options
    );
    if (!errored) {
      if (!args.silent) {
        const hasWarnings = results.some(result => {
          if (result.ignored) {
            return null;
          }
          return result.warnings.some(
            warning => warning.severity === "warning"
          );
        });
        if (hasWarnings) {
          console.log(formattedOutput);
        } else {
          console.log(
            format(
              chalk`{bgGreen.black  DONE }`,
              `stylelint 没有发现错误!${
                options.fix ? chalk` {blue (已经自动修复)}` : ""
              }`
            )
          );
        }
      }
    } else {
      console.log(formattedOutput);
      process.exit(1);
    }
  } catch (err) {
    console.log(
      format(chalk`{bgRed.black  ERROR }`, err.stack.slice(" Error:".length))
    );
    process.exit(1);
  }
};
```

### <a name="11_4">代码提交检查</a>

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{vue,htm,html,css,sss,less,scss}": [
      "webpack-box lint stylelint",
      "git add"
    ],
    "*.{js,jsx}": ["webpack-box lint eslint", "git add"]
  }
}
```
