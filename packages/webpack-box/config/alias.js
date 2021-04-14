// [别名配置]
/**
 * @name alias
 * @description 别名配置
 */
module.exports = ({ config, options, resolve }) => {
  const fs = require('fs')
  const conf = options.alias
  return () => {
    // 生成默认别名
    const dirs = fs.readdirSync(resolve('src'))
    let aliasConfig = config.resolve
      .extensions
      .merge(['.mjs', '.js', '.jsx', '.vue', '.ts', '.tsx', '.json', '.wasm'])
      .end()
      .alias
    dirs.forEach((v) => {
      const stat = fs.statSync(resolve(`src/${v}`))
      if (stat.isDirectory()) {
        aliasConfig = aliasConfig.set(`@${v}`, resolve(`src/${v}`))
      }
    })

    // 用户配置别名
    if (conf.alias) {
      const keys = Object.keys(conf.alias)
      keys.forEach((key) => {
        aliasConfig = aliasConfig.set(key, conf.alias[key])
      })
    }

    // 自定义设置别名
    aliasConfig
      .set('@', resolve('src'))
      .set('@src', resolve('src'))
  }
}
