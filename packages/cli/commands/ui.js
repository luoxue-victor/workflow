const { join } = require('path')
const fs = require('fs')

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('ui')
    .description('cli ui，界面话')
    .action(async (plugin, options = {}) => {
      server()
    })
}

const client = () => {
  const {createServer, getPlugins} = require('@pkb/vite-box')
  const plugins = getPlugins();
  createServer({ plugins, root: join(__dirname, '..') })
}

const server = async () => {
  const configPath = join(__dirname, '..', 'src', 'config.js')
  const server = require('@pkb/node-box/build/server')

  server({ root: join(__dirname, '..') })
}
