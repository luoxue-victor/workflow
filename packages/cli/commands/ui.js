const { join } = require('path')
const { createServer } = require('@pkb/node-box/socket')

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('ui')
    .description('cli ui，界面话')
    .action(async (plugin, options = {}) => {
      // await socket()
      await server()
    })
}

async function socket () {

} 

const client = () => {
  const {createServer, getPlugins} = require('@pkb/vite-box')
  const plugins = getPlugins();
  createServer({ plugins, root: join(__dirname, '..') })
}

const server = async () => {
  const server = require('@pkb/node-box/build/server')

  server({ root: join(__dirname, '..') })
}