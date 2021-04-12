## 课时 17：加载资源 images、svg、media、fonts

这章就直接上代码吧，是之前基础篇的补充

```js
module.exports = ({ config, webpackVersion, resolve, options }) => {
  return () => {
    const getAssetPath = require("../util/getAssetPath");
    const inlineLimit = 4096;

    const genAssetSubPath = dir => {
      return getAssetPath(
        options,
        `${dir}/[name]${options.filenameHashing ? ".[hash:8]" : ""}.[ext]`
      );
    };

    const genUrlLoaderOptions = dir => {
      return {
        limit: inlineLimit,
        fallback: {
          loader: "file-loader",
          options: {
            name: genAssetSubPath(dir)
          }
        }
      };
    };

    config.module
      .rule("images")
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use("url-loader")
      .loader(require.resolve("url-loader"))
      .options(genUrlLoaderOptions("img"));

    config.module
      .rule("svg")
      .test(/\.(svg)(\?.*)?$/)
      .use("file-loader")
      .loader(require.resolve("file-loader"))
      .options({
        name: genAssetSubPath("img")
      });

    config.module
      .rule("media")
      .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .use("url-loader")
      .loader(require.resolve("url-loader"))
      .options(genUrlLoaderOptions("media"));

    config.module
      .rule("fonts")
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use("url-loader")
      .loader(require.resolve("url-loader"))
      .options(genUrlLoaderOptions("fonts"));
  };
};
```
