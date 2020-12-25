#!/usr/bin/env node
const { chalk, semver } = require('@pkb/shared-utils')
const program = require('commander')
const fs = require('fs')
const path = require('path')
const utils = require('../util/utils')
const exec = require('child_process').execSync
let config = {}
const configPath = path.join(process.cwd(), 'tls.config')
if (fs.existsSync(configPath)) {
  config = require(configPath)
}

checkNodeVersionForWarning()

program
  .version(`tls ${require('../package.json').version}`)
  .usage('<command> [options]')

const commandsPath = path.join(__dirname, '..', 'commands')
const fileNames = fs.readdirSync(commandsPath)

fileNames.forEach(fileName => {
  const filePath = path.join(commandsPath, fileName)
  const command = require(filePath)
  command.registerCommand({
    program,
    cleanArgs,
    utils,
    exec,
    LOG: require('../util/log'),
    config
  })
})

program.commands.forEach(c => c.on('--help', () => console.log()))

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
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

function checkNodeVersionForWarning() {
  if (semver.satisfies(process.version, '10.x')) {
    console.log(chalk.red(
      `你正在用的 node 版本是：${process.version}.\n` +
      '未来版本将不再支持 10.x 版本.\n'
    ))
  }
}
