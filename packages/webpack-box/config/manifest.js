// [提取 manifest]
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = ({ config }) => {
  return () => {
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
}
