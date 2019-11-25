const webpack = require('webpack')

module.exports = (config, resolve) => {
  return () => {
    config.plugin('DllPlugin')
      .use(webpack.DllReferencePlugin, [{
        context: process.cwd(),
        manifest: require(resolve('dll/manifest.json'))
      }])
  }
}