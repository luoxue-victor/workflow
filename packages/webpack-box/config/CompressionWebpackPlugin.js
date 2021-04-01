// [开启gzip]
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = ({ config }) => {
  return () => {
    config.plugin('CompressionWebpackPlugin')
      .use(CompressionWebpackPlugin, [{
        algorithm: 'gzip',
        threshold: 8192,
        test: /\.js(\?.*)?$/i,
        minRatio: 0.8
      }])
  }
}
