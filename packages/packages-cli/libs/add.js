const chalk = require('chalk')
const invoke = require('./invoke')
const { loadOptions } = require('./options')
const { installPackage } = require('./util/installDeps')
const {
  log,
  error,
  hasProjectYarn,
  hasProjectPnpm,
  resolveModule
} = require('@vue/cli-shared-utils')

const packageManager = loadOptions().packageManager || (hasProjectYarn(context) ? 'yarn' : hasProjectPnpm(context) ? 'pnpm' : 'npm')

async function add(pluginName, options = {}, context = process.cwd()) {
  const packageName = pluginName

  log()
  log(`📦  正在安装 ${chalk.cyan(packageName)}...`)
  log()

  await installPackage(context, packageManager, options.registry, packageName)

  log(`${chalk.green('✔')}  安装插件成功: ${chalk.cyan(packageName)}`)
  log()

  const generatorPath = resolveModule(`${packageName}/generator`, context)
  if (generatorPath) {
    invoke(pluginName, options, context)
  } else {
    log(`插件 ${packageName} 没有 generator 调用`)
  }
}

exports.add = (...args) => {
  return add(...args).catch(err => {
    error(err)
    process.exit(1)
  })
}

exports.packageManager = packageManager
