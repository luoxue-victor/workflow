// [提取 manifest]
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
/**
 * @name webpack-manifest-plugin
 * @description 提取 manifest
 */
module.exports = ({ config }) => () => {
  config.plugin('manifest')
    .use(WebpackManifestPlugin, [])

  config
    .optimization
    .splitChunks({
      chunks: 'all'
    })
    .runtimeChunk({
      name: 'runtime'
    })
}
