// [开启gzip]
/**
 * @name CompressionWebpackPlugin
 * @description 严格区分大小写
 */
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = ({ config }) => () => {
  config.plugin('CompressionWebpackPlugin')
    .use(CompressionWebpackPlugin, [{
      algorithm: 'gzip',
      threshold: 8192,
      test: /\.js(\?.*)?$/i,
      minRatio: 0.8
    }])
}
