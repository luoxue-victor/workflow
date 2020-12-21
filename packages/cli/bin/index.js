#!/usr/bin/env node
import { chalk, semver } from '@pkb/shared-utils'
import { threshold } from 'didyoumean'
import minimist from 'minimist'
import { version, command, on, commands, parse, outputHelp } from 'commander'

// enhance common error messages
import enhanceErrorMessages from '../lib/util/enhanceErrorMessages'

threshold = 0.6

checkNodeVersionForWarning()

version(`@pkb/cli ${require('../package.json').version}`)
  .usage('<command> [options]')

command('create <app-name>')
  .description('create a project by webpack-box')
  .action((name, cmd) => {
    const options = cleanArgs(cmd)

    require('../lib/create')(name, options)
  })

command('add [plugin] [pluginOptions]')
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

command('invoke <plugin> [pluginOptions]')
  .description('安装插件并在已创建的项目中调用其生成器')
  .option('--registry <url>', '安装依赖项时使用指定的npm注册表(仅适用于npm)')
  .allowUnknownOption()
  .action((plugin) => {
    require('../lib/invoke')(plugin, minimist(process.argv.slice(3)))
  })

command('inspect [paths...]')
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

command('ui')
  .description('start and open the webpack-box ui')
  .action((cmd) => {
    checkNodeVersion('>=8.6', 'webpack-box ui')
    require('../lib/ui')(cleanArgs(cmd))
  })

command('config [value]')
  .description('inspect and modify the config')
  .option('-g, --get <path>', 'get value from option')
  .option('-s, --set <path> <value>', 'set option value')
  .option('-d, --delete <path>', 'delete option from config')
  .option('-e, --edit', 'open config with default editor')
  .option('--json', 'outputs JSON result only')
  .action((value, cmd) => {
    require('../lib/config')(value, cleanArgs(cmd))
  })

command('outdated')
  .description('(experimental) check for outdated vue cli service / plugins')
  .option('--next', 'Also check for alpha / beta / rc versions when upgrading')
  .action((cmd) => {
    require('../lib/outdated')(cleanArgs(cmd))
  })

command('upgrade [plugin-name]')
  .description('(experimental) upgrade vue cli service / plugins')
  .option('-t, --to <version>', 'upgrade <package-name> to a version that is not latest')
  .option('-r, --registry <url>', 'Use specified npm registry when installing dependencies')
  .option('--all', 'Upgrade all plugins')
  .option('--next', 'Also check for alpha / beta / rc versions when upgrading')
  .action((packageName, cmd) => {
    require('../lib/upgrade')(packageName, cleanArgs(cmd))
  })

command('info')
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

// add some useful info on help
on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan('vue <command> --help')} for detailed usage of given command.`)
  console.log()
})

commands.forEach(c => c.on('--help', () => console.log()))

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

parse(process.argv)

if (!process.argv.slice(2).length) {
  outputHelp()
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
