// [打包分析]
const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer')

module.exports = ({ config, options }) => {
  return () => {
    if (process.env.npm_config_report || options.report) {
      config.plugin('BundleAnalyzerPlugin')
        .use(BundleAnalyzerPlugin, [{
          analyzerMode: 'static'
        }])
    }
  }
}
