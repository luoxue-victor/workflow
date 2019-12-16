// [基础配置]
module.exports = ({ config, webpackVersion, resolve, options }) => {
  let name = 'app'
  let entry = options.entry || 'src/main.js'
  let output = options.output || 'dist'
  const publicPath = options.publicPath || '/'
  if (options.name) {
    name = options.name
    output = `${output}/${name}`
    entry = options.pages[name].entry
  }
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
      .set('mode', 'development') // process.env.NODE_ENV
      // 出口
      .output
      .path(resolve(output))
      .filename(`js/${options.filenameHashing ? `[name]${isV5 ? '.[contenthash:8]' : ''}` : ''}.bundle.js`)
      .publicPath(publicPath)

    if (isV5) {
      config.output.set('ecmaVersion', 6)
    }
    config.devtool('cheap-source-map')
  }
}
