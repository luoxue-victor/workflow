const path = require('path')
const chalk = require('chalk')
const { spawn } = require('child_process');
const nodemon = require('nodemon')
const usePort = require('use-port');

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('ui')
    .description('cli ui，界面话')
    .action(async (plugin, options = {}) => {
      // client()
      server()
    })
}

const client = () => {
  const {createServer, getPlugins} = require('@pkb/vite-box')
  const plugins = getPlugins();
  createServer(plugins, 8888, path.join(__dirname, '..'))
}

const server = async () => {
  const port = await usePort(1400)

  const Server = require('@pkb/node-box')
  Server({port, root: path.join(__dirname, '..')})
  // nodemon({
  //   script: require('')
  // })

}
