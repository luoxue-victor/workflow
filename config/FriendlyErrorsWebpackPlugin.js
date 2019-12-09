module.exports = ({ config }) => {
  const { transformer, formatter } = require('../util/resolveLoaderError')
  return () => {
    config.plugin('friendly-errors')
      .use(require('@soda/friendly-errors-webpack-plugin'), [{
        additionalTransformers: [transformer],
        additionalFormatters: [formatter]
      }])
  }
}
