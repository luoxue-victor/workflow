// [EnvironmentPlugin 定义通用变量]
const webpack = require('webpack')

module.exports = ({ config, options }) => {
  return () => {
    const resolveClientEnv = require('../util/resolveClientEnv')
    config
      .plugin('process-env')
      .use(webpack.EnvironmentPlugin, [
        resolveClientEnv(options)
      ])
  }
}
