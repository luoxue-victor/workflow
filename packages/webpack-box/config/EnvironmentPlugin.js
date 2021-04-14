// [EnvironmentPlugin 定义通用变量]
const webpack = require('webpack')
/**
 * @name EnvironmentPlugin
 * @description 定义通用变量
 */
module.exports = ({ config, options }) => () => {
  const resolveClientEnv = require('../util/resolveClientEnv')
  config
    .plugin('process-env')
    .use(webpack.EnvironmentPlugin, [
      resolveClientEnv(options)
    ])
}
