// [dll-plugin 配置]
const webpack = require('webpack')
/**
 * @name dll-plugin
 * @description 查分包配置
 */
module.exports = ({ config, resolve, options }) => () => {
  if (options.dll) {
    config.plugin('DllPlugin')
      .use(webpack.DllReferencePlugin, [{
        context: process.cwd(),
        manifest: require(resolve('dll/manifest.json'))
      }])
  }
}
