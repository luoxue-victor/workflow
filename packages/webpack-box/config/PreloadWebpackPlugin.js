// [PreloadWebpackPlugin]
// npm install  preload-webpack-plugin@next
/**
 * @name PreloadWebpackPlugin
 * @description preload 预加载
 */
module.exports = ({ config, resolve, options }) => {
  const PreloadWebpackPlugin = require('preload-webpack-plugin')
  return () => {
    config
      .plugin('preload')
      .use(PreloadWebpackPlugin, [{
        rel: 'preload',
        include: 'initial',
        fileBlacklist: [/\.map$/, /hot-update\.js$/]
      }])
      .after('html')
    config
      .plugin('prefetch')
      .use(PreloadWebpackPlugin, [{
        rel: 'prefetch',
        include: 'asyncChunks'
      }])
      .after('html')
  }
}
