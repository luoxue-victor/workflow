const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer')

module.exports = (config, resolve) => {
  return () => {
    if (process.argv.includes('--report')) {
      config.plugin('BundleAnalyzerPlugin')
        .use(BundleAnalyzerPlugin, [{
          analyzerMode: 'static'
        }])
    }
  }
}
