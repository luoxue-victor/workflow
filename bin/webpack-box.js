#!/usr/bin/env node
process.env.NODE_ENV = 'none'
const commandsName = ['build', 'dev', 'dll', 'build:ssr', 'ssr:server', 'lint']
const {
  injectCommand,
  commandComplete,
  commandName
} = require('../cli/CommandAPI')

const PluginAPI = require('../cli/PluginAPI')
commandName.push(...commandsName)

commandsName.forEach(name => {
  const { command } = require(`../build/${name}`)
  command(injectCommand, PluginAPI)
})

commandComplete()
