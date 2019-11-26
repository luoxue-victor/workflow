const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer')

module.exports = ({ config, options }) => {
  return () => {
    if (options.report) {
      config.plugin('BundleAnalyzerPlugin')
        .use(BundleAnalyzerPlugin, [{
          analyzerMode: 'static'
        }])
    }
  }
}
