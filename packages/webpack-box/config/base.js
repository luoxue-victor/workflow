// [基础配置]
/**
 * @name base
 * @description 基础配置
 */
module.exports = ({
  config, webpackVersion, resolve, options
}) => {
  const name = options.name || 'app'
  const pageConfig = options.pages[name]
  const output = `${pageConfig.output || 'dist'}/${name}`
  const publicPath = pageConfig.publicPath || '/'
  const entry = pageConfig.entry || 'src/main.js'

  const isV5 = parseInt(webpackVersion) >= 5
  return () => {
    config
      // 入口名称
      .entry(name)
      // 入口路径
      .add(resolve(entry))
      .end()
      .cache({
        type: 'filesystem'
      })
      // 模式 "production" | "development" | "none"
      // .mode(process.env.NODE_ENV) 等价下面
      .set('mode', process.env.NODE_ENV) // process.env.NODE_ENV
      // 出口
      .output
      .path(resolve(output))
      .filename(`js/${options.filenameHashing ? `[name]${isV5 ? '.[contenthash:8]' : ''}` : ''}.bundle.js`)
      .publicPath(publicPath)

    config.devtool('cheap-source-map')
  }
}
