#!/usr/bin/env node
const { chalk, semver } = require('@pkb/shared-utils')
const didYouMean = require('didyoumean')
const program = require('commander')
const path = require('path')
const fs = require('fs')
const LOG = require('../lib/tools/log')
const execSync = require('child_process').execSync

didYouMean.threshold = 0.6

checkNodeVersionForWarning()

program
  .version(`@pkb/cli ${require('../package.json').version}`)
  .usage('<command> [options]')

const commandsPath = path.join(__dirname, '..', 'commands')
const fileNames = fs.readdirSync(commandsPath)

fileNames.forEach(fileName => {
  const filePath = path.join(commandsPath, fileName)
  const command = require(filePath)
  command.registerCommand({
    program,
    cleanArgs,
    LOG,
    execSync
  })
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
