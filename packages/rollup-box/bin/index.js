#!/usr/bin/env node
const program = require('commander')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const didYouMean = require('didyoumean')

program
  .version(`@pkb/rollup-box ${require('../package.json').version}`)
  .usage('<command> [options]')

const commandsPath = path.join(__dirname, '..', 'commands')
const fileNames = fs.readdirSync(commandsPath)

fileNames.forEach(fileName => {
  const filePath = path.join(commandsPath, fileName)
  const command = require(filePath)
  command.registerCommand({
    program,
    cleanArgs
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
  console.log(`  Run ${chalk.cyan('rollup-box <command> --help')} for detailed usage of given command.`)
  console.log()
})

program.commands.forEach(c => c.on('--help', () => console.log()))

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
