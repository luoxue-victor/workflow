## 课时 24：配置 react

基础配置已经全部配置好了，所以 react 的配置就只有将 jsx 的文件用 babel 编译一下就 ok 了，下面配置将 babel 的配置进行了修改

开启 react

webpack-box.config.js

```js
{
  "env": {
    "REACT": "react" // 配置 react
  }
}
```

packages/react/webpack-chain.config.js

```js
// [react 配置]
module.exports = ({ config }) => {
  return () => {
    if (!process.env.REACT) return;
    const baseRule = config.module.rule("babel");
    baseRule
      .use("babel")
      .loader(require.resolve("babel-loader"))
      .tap(options => {
        options.presets.push([
          "@babel/preset-react",
          {
            corejs: "3",
            useBuiltIns: "usage",
            loose: true,
            modules: false,
            targets: {
              chrome: 59,
              edge: 13,
              firefox: 50,
              safari: 8
            }
          }
        ]);
        return options;
      });
  };
};
```
