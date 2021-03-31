#!/usr/bin/env node
const { chalk, semver } = require('@pkb/shared-utils')
const didYouMean = require('didyoumean')
const minimist = require('minimist')
const program = require('commander')

didYouMean.threshold = 0.6

checkNodeVersionForWarning()

program
  .version(`@pkb/cli ${require('../package.json').version}`)
  .usage('<command> [options]')

program
  .command('create <app-name>')
  .description('创建一个项目')
  .action((name, cmd) => {
    const options = cleanArgs(cmd)
    require('../lib/create')(name, options)
  })

program
  .command('add [plugin] [pluginOptions]')
  .description('安装插件并在已创建的项目中调用其生成器')
  .option('--registry <url>', '安装依赖项时使用指定的npm注册表(仅适用于npm)')
  .allowUnknownOption()
  .action(async (plugin, options = {}) => {
    if (plugin) {
      require('../lib/add')(plugin, minimist(process.argv.slice(3)))
    } else {
      const path = require('path')
      const Creator = require('../lib/Creator')
      const cwd = options.cwd || process.cwd()
      const inCurrent = '.'
      const name = inCurrent ? path.relative('../', cwd) : ''
      const targetDir = path.resolve(cwd, '.')
      const { getPromptModules } = require('../lib/util/createTools')
      const creator = new Creator(name, targetDir, getPromptModules())
      await creator.create({})
    }
  })

program
  .command('invoke <plugin> [pluginOptions]')
  .description('安装插件并在已创建的项目中调用其生成器')
  .option('--registry <url>', '安装依赖项时使用指定的npm注册表(仅适用于npm)')
  .allowUnknownOption()
  .action((plugin) => {
    require('../lib/invoke')(plugin, minimist(process.argv.slice(3)))
  })

program
  .command('inspect [paths...]')
  .description('inspect the webpack config in a project with vue-cli-service')
  .option('--mode <mode>')
  .option('--rule <ruleName>', 'inspect a specific module rule')
  .option('--plugin <pluginName>', 'inspect a specific plugin')
  .option('--rules', 'list all module rule names')
  .option('--plugins', 'list all plugin names')
  .option('-v --verbose', 'Show full function definitions in output')
  .action((paths, cmd) => {
    require('../lib/inspect')(paths, cleanArgs(cmd))
  })

program
  .command('ui')
  .description('start and open the vue-cli ui')
  .option('-H, --host <host>', 'Host used for the UI server (default: localhost)')
  .option('-p, --port <port>', 'Port used for the UI server (by default search for available port)')
  .option('-D, --dev', 'Run in dev mode')
  .option('--quiet', 'Don\'t output starting messages')
  .option('--headless', 'Don\'t open browser on start and output port')
  .action((cmd) => {
    checkNodeVersion('>=8.6', 'vue ui')
    require('../lib/ui')(cleanArgs(cmd))
  })

program
  .command('upgrade [plugin-name]')
  .description('(experimental) upgrade vue cli service / plugins')
  .option('-t, --to <version>', 'upgrade <package-name> to a version that is not latest')
  .option('-r, --registry <url>', 'Use specified npm registry when installing dependencies')
  .option('--all', 'Upgrade all plugins')
  .option('--next', 'Also check for alpha / beta / rc versions when upgrading')
  .action((packageName, cmd) => {
    require('../lib/upgrade')(packageName, cleanArgs(cmd))
  })

program
  .command('info')
  .description('打印有关环境的调试信息')
  .action(() => {
    console.log(chalk.cyanBright('\n 正在搜检环境信息:'))
    require('envinfo').run(
      {
        System: ['OS', 'CPU'],
        Binaries: ['Node', 'Yarn', 'npm'],
        Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
        npmPackages: '/**/{*webpack*,*babel*,**typescript**,*pkb*}',
        npmGlobalPackages: ['@pkb/cli']
      },
      {
        showNotFound: true,
        duplicates: true,
        fullTree: true
      }
    ).then(info => console.log(chalk.greenBright(info)))
  })

// output help information on unknown commands
program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log('  ' + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
    suggestCommands(cmd)
  })

// add some useful info on help
program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan('vue <command> --help')} for detailed usage of given command.`)
  console.log()
})

program.commands.forEach(c => c.on('--help', () => console.log()))

// enhance common error messages
const enhanceErrorMessages = require('../lib/util/enhanceErrorMessages')

enhanceErrorMessages('missingArgument', argName => {
  return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`
})

enhanceErrorMessages('unknownOption', optionName => {
  return `Unknown option ${chalk.yellow(optionName)}.`
})

enhanceErrorMessages('optionMissingArgument', (option, flag) => {
  return `Missing required argument for option ${chalk.yellow(option.flags)}` + (
    flag ? `, got ${chalk.yellow(flag)}` : ''
  )
})

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

function suggestCommands(unknownCommand) {
  const availableCommands = program.commands.map(cmd => {
    return cmd._name
  })

  const suggestion = didYouMean(unknownCommand, availableCommands)
  if (suggestion) {
    console.log('  ' + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`))
  }
}

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

function cleanArgs(cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}

function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(chalk.red(
      '你正在用的 node 版本是：' + process.version +
      '\n需要的版本：' + wanted + '\n请升级你的 node 版本.'
    ))
    process.exit(1)
  }
}

function checkNodeVersionForWarning () {
  if (semver.satisfies(process.version, '10.x')) {
    console.log(chalk.red(
      `你正在用的 node 版本是：${process.version}.\n` +
      '未来版本将不再支持 10.x 版本.\n'
    ))
  }
}
