const { chalk, semver } = require('@pkb/shared-utils')
const didYouMean = require('didyoumean')
const program = require('commander')
const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')
const { getAllPluginIdOfPackageJson } = require('@pkb/shared-utils')
const PluginAPI = require('./api/PluginAPI')

didYouMean.threshold = 0.6
checkNodeVersionForWarning()

module.exports = function ({
  root = process.cwd(),
  getPluginIdOfPackageJson, // 自定义从 package.json 获取插件
}) {
  const pkg = require(path.join(root, 'package.json'))
  const getPluginId = getPluginIdOfPackageJson || getAllPluginIdOfPackageJson

  program
    .version(`${pkg.name} ${pkg.version}`)
    .usage('<command> [options]')

  const commandsPath = path.join(root, 'commands')
  const fileNames = fs.readdirSync(commandsPath)

  fileNames.forEach((fileName) => {
    const filePath = path.join(commandsPath, fileName)
    const command = require(filePath)
    command.registerCommand({
      program,
      cleanArgs,
      execSync
    })
  })

  // 注册插件中的 command
  if (fs.existsSync(path.join(process.cwd(), 'package.json'))) {
    getPluginId().forEach((id) => {
      try {
        const command = require(`${id}/${/^@/.test(pkg.name) ? pkg.name.split('/')[1] : pkg.name}-command.config.js`)
        try {
          // config 为预留api
          command({ program, api: PluginAPI, cleanArgs, config: {} })
        } catch (error) {
          console.log(error)
        }
      } catch (error) { }
    })
  }

  program
    .arguments('<command>')
    .action((cmd) => {
      program.outputHelp()
      console.log(`  ${chalk.red(`Unknown command ${chalk.yellow(cmd)}.`)}`)
      console.log()
      suggestCommands(cmd)
    })

  program.on('--help', () => {
    console.log()
    console.log(`  Run ${chalk.cyan('pk <command> --help')} for detailed usage of given command.`)
    console.log()
  })

  program.commands.forEach((c) => c.on('--help', () => console.log()))

  const enhanceErrorMessages = require('./util/enhanceErrorMessages')

  enhanceErrorMessages('missingArgument', (argName) => `Missing required argument ${chalk.yellow(`<${argName}>`)}.`)

  enhanceErrorMessages('unknownOption', (optionName) => `Unknown option ${chalk.yellow(optionName)}.`)

  enhanceErrorMessages('optionMissingArgument', (option, flag) => `Missing required argument for option ${chalk.yellow(option.flags)}${flag ? `, got ${chalk.yellow(flag)}` : ''}`)

  program.parse(process.argv)

  if (!process.argv.slice(2).length) {
    program.outputHelp()
  }

  function suggestCommands(unknownCommand) {
    const availableCommands = program.commands.map((cmd) => cmd._name)

    const suggestion = didYouMean(unknownCommand, availableCommands)
    if (suggestion) {
      console.log(`  ${chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`)}`)
    }
  }

  function camelize(str) {
    return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
  }

  function cleanArgs(cmd) {
    const args = {}
    cmd && cmd.options && cmd.options.forEach((o) => {
      const key = camelize(o.long.replace(/^--/, ''))
      if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
        args[key] = cmd[key]
      }
    })
    return args
  }
}

function checkNodeVersionForWarning() {
  if (semver.satisfies(process.version, '10.x')) {
    console.log(chalk.red(
      `你正在用的 node 版本是：${process.version}.\n` +
      '未来版本将不再支持 10.x 版本.\n'
    ))
  }
}
