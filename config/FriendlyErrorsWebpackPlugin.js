const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = ({ config }) => {
  return () => {
    config.plugin('error')
      .use(FriendlyErrorsWebpackPlugin)
  }
}
