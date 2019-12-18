const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')
const chalk = require('chalk')
const globby = require('globby')
const inquirer = require('inquirer')
const isBinary = require('isbinaryfile')
const Generator = require('./Generator')
const { loadOptions } = require('./options')
const { installDeps } = require('./util/installDeps')
const normalizeFilePaths = require('./util/normalizeFilePaths')
const {
  log,
  error,
  hasProjectYarn,
  hasProjectGit,
  hasProjectPnpm,
  logWithSpinner,
  stopSpinner,
  resolvePluginId,
  loadModule
} = require('@vue/cli-shared-utils')

async function readFiles (context) {
  const files = await globby(['**'], {
    cwd: context,
    onlyFiles: true,
    gitignore: true,
    ignore: ['**/node_modules/**', '**/.git/**'],
    dot: true
  })
  const res = {}
  for (const file of files) {
    const name = path.resolve(context, file)
    res[file] = isBinary.isBinaryFileSync(name)
      ? fs.readFileSync(name)
      : fs.readFileSync(name, 'utf-8')
  }
  return normalizeFilePaths(res)
}

function getPkg (context) {
  const pkgPath = path.resolve(context, 'package.json')
  if (!fs.existsSync(pkgPath)) {
    throw new Error(`package.json not found in ${chalk.yellow(context)}`)
  }
  const pkg = fs.readJsonSync(pkgPath)
  if (pkg.vuePlugins && pkg.vuePlugins.resolveFrom) {
    return getPkg(path.resolve(context, pkg.vuePlugins.resolveFrom))
  }
  return pkg
}

// 开始调用
async function invoke (pluginName, options = {}, context = process.cwd()) {
  delete options._
  const pkg = getPkg(context)

  const findPlugin = deps => {
    if (!deps) return
    let name

    if (deps[(name = `vue-cli-plugin-${pluginName}`)]) {
      return name
    }

    if (deps[(name = resolvePluginId(pluginName))]) {
      return name
    }
  }

  const id = findPlugin(pkg.devDependencies) || findPlugin(pkg.dependencies)

  const pluginGenerator = loadModule(`${id}/generator`, context)

  if (!pluginGenerator) {
    throw new Error(`插件 ${id} 没有 generator`)
  }

  let { registry, ...pluginOptions } = options

  if (!Object.keys(pluginOptions).length) {
    let pluginPrompts = loadModule(`${id}/prompts`, context)

    if (pluginPrompts) {
      if (typeof pluginPrompts === 'function') {
        pluginPrompts = pluginPrompts(pkg)
      }
      if (typeof pluginPrompts.getPrompts === 'function') {
        pluginPrompts = pluginPrompts.getPrompts(pkg)
      }
      pluginOptions = await inquirer.prompt(pluginPrompts)
    }
  }

  const plugin = {
    id,
    apply: pluginGenerator,
    options: {
      registry,
      ...pluginOptions
    }
  }

  await runGenerator(context, plugin, pkg)
}

async function runGenerator (context, plugin, pkg = getPkg(context)) {
  const isTestOrDebug = process.env.VUE_CLI_TEST || process.env.VUE_CLI_DEBUG
  const createCompleteCbs = []
  const generator = new Generator(context, {
    pkg,
    plugins: [plugin],
    files: await readFiles(context),
    completeCbs: createCompleteCbs,
    invoking: true
  })

  log()
  log(`🚀  调用插件 ${plugin.id}...`)
  await generator.generate({
    extractConfigFiles: true,
    checkExisting: true
  })

  const newDeps = generator.pkg.dependencies
  const newDevDeps = generator.pkg.devDependencies
  const depsChanged =
    JSON.stringify(newDeps) !== JSON.stringify(pkg.dependencies) ||
    JSON.stringify(newDevDeps) !== JSON.stringify(pkg.devDependencies)

  if (!isTestOrDebug && depsChanged) {
    log('📦  Installing additional dependencies...')
    log()

    const packageManager =
      loadOptions().packageManager || (hasProjectYarn(context) ? 'yarn' : hasProjectPnpm(context) ? 'pnpm' : 'npm')
    await installDeps(context, packageManager, plugin.options && plugin.options.registry)
  }

  if (createCompleteCbs.length) {
    logWithSpinner('⚓', 'Running completion hooks...')
    for (const cb of createCompleteCbs) {
      console.log('')
      await cb()
    }
    stopSpinner()
    log()
  }

  log(`${chalk.green('✔')}  成功安装插件: ${chalk.cyan(plugin.id)}`)

  if (hasProjectGit(context)) {
    const { stdout } = await execa('git', [
      'ls-files',
      '--exclude-standard',
      '--modified',
      '--others'
    ], {
      cwd: context
    })
  }
  generator.printExitLogs()
}

module.exports = (...args) => {
  return invoke(...args).catch(err => {
    error(err)
    if (!process.env.VUE_CLI_TEST) {
      process.exit(1)
    }
  })
}

module.exports.runGenerator = runGenerator
