const invoke = require('./invoke')
const {
  chalk,
  semver,
  resolveModule
} = require('@pkb/shared-utils')
const PackageManager = require('./util/ProjectPackageManager')
const {
  log,
  error,
  resolvePluginId,
  isOfficialPlugin
} = require('@pkb/shared-utils')
const confirmIfGitDirty = require('./util/confirmIfGitDirty')

async function add(pluginName, options = {}, context = process.cwd()) {
  if (!(await confirmIfGitDirty(context))) {
    return
  }

  const packageName = resolvePluginId(pluginName)

  log()
  log(`📦  正在安装 ${chalk.cyan(packageName)}...`)
  log()

  const pm = new PackageManager({ context })

  const cliVersion = require('@pkb/shared-utils/package.json').version
  if (isOfficialPlugin(packageName) && semver.prerelease(cliVersion)) {
    await pm.add(`${packageName}@^${cliVersion}`)
  } else {
    await pm.add(packageName)
  }

  log(`${chalk.green('✔')}  插件安装成功: ${chalk.cyan(packageName)}`)
  log()

  const generatorPath = resolveModule(`${packageName}/generator`, context)
  if (generatorPath) {
    invoke(pluginName, options, context)
  } else {
    log(`插件 ${packageName} 没有 generator`)
  }
}

module.exports = (...args) => {
  return add(...args).catch(err => {
    error(err)
    process.exit(1)
  })
}
