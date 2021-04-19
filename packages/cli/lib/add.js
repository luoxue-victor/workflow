/**
 * 添加插件
 * @use
 * pk add <paluginName>
 */
const {
  chalk,
  resolvePluginId,
  log,
  error,
} = require('@pkb/shared-utils')
const PackageManager = require('../util/ProjectPackageManager')

async function add(pluginName) {
  const packageName = resolvePluginId(pluginName)

  if (!packageName) {
    console.log(chalk.red(`${pluginName} 不是插件`))
    process.exit(0)
  }

  log()
  log(`📦  正在安装 ${chalk.cyan(packageName)} ...`)
  log()

  const pm = new PackageManager({ context: process.cwd() })

  pm.add(packageName)

  log(`${chalk.green('✔')}  插件安装成功: ${chalk.cyan(packageName)}`)
  log()

  // todo 后面可以添加一些钩子
}

module.exports = (...args) => add(...args).catch((err) => {
  error(err)
  process.exit(1)
})
