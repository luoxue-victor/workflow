// [dashboard 增加仪表盘配置]
/**
 * @name dashboard
 * @description 增加仪表盘配置
 */
module.exports = ({ config, resolve, options }) => {
  const DashboardPlugin = require('webpack-dashboard/plugin')

  return () => {
    config.plugin('dashboard')
      .use(DashboardPlugin)
  }
}
