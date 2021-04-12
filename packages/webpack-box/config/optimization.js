// [optimization 优化配置]
/**
 * @name optimization
 * @description 优化配置
 */
module.exports = ({ config, webpackVersion }) => {
  const v = parseInt(webpackVersion)
  return () => {
    config
      .optimization.splitChunks({
        chunks: 'async',
        // webpack5
        // https://github.com/webpack/changelog-v5#splitchunks-and-module-sizes
        minSize: v === 5 ? {
          javascript: 30000,
          style: 50000
        } : 30000,
        minChunks: 1,
        maxAsyncRequests: 3,
        maxInitialRequests: 3,
        cacheGroups: {
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      })
    config.optimization.usedExports(true)
    // config.optimization.set('chunkIds', 'natural')
  }
}
