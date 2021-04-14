// [ProgressBarPlugin 构建时添加进度条配置]
/**
 * @name progress-bar-webpack-plugin
 * @description 构建时添加进度条配置
 */
module.exports = ({ config, resolve, options }) => {
  const ProgressBarPlugin = require('progress-bar-webpack-plugin')
  const chalk = require('chalk')
  return () => {
    config.plugin('ProgressBarPlugin')
      .use(ProgressBarPlugin, [{
        format: `  build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
        clear: false
      }])
  }
}
