## 课时 20：添加 prefetch + preload

```js
module.exports = ({ config, resolve, options }) => {
  const PreloadWebpackPlugin = require("preload-webpack-plugin");
  return () => {
    config.plugin("preload").use(PreloadWebpackPlugin, [
      {
        rel: "preload",
        as(entry) {
          if (/\.css$/.test(entry)) return "style";
          if (/\.woff$/.test(entry)) return "font";
          if (/\.png$/.test(entry)) return "image";
          return "script";
        }
      }
    ]);
    config.plugin("prefetch").use(PreloadWebpackPlugin, [
      {
        rel: "prefetch",
        include: "asyncChunks"
      }
    ]);
  };
};
```
