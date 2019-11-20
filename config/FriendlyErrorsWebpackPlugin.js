const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = (config, resolve) => {
  return () => {
    config.plugin('error')
      .use(FriendlyErrorsWebpackPlugin)
  }
}