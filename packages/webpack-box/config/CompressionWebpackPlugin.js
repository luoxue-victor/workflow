// [开启gzip]
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = ({ config }) => {
  return () => {
    config.plugin('CompressionWebpackPlugin')
      .use(CompressionWebpackPlugin, [{
        algorithm: 'gzip',
        test: /\.js(\?.*)?$/i,
        // threshold: 10240,
        minRatio: 0.8
      }])
  }
}
