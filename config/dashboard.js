// [dashboard 增加仪表盘配置]

module.exports = ({ config, resolve, options }) => {
  const DashboardPlugin = require('webpack-dashboard/plugin')
  const chalk = require('chalk')

  return () => {
    config.plugin('dashboard')
      .use(DashboardPlugin, [{
        format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        clear: false
      }])
  }
}
