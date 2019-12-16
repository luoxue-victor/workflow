// [ProgressBarPlugin 构建时添加进度条配置]

module.exports = ({ config, resolve, options }) => {
  const ProgressBarPlugin = require('progress-bar-webpack-plugin')
  return () => {
    config.plugin('ProgressBarPlugin')
      .use(ProgressBarPlugin)
  }
}
