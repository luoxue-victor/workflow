// [dll-plugin 配置]
const webpack = require('webpack')

module.exports = ({ config, resolve, options }) => {
  return () => {
    if (options.dll) {
      config.plugin('DllPlugin')
        .use(webpack.DllReferencePlugin, [{
          context: process.cwd(),
          manifest: require(resolve('dll/manifest.json'))
        }])
    }
  }
}
