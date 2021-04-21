const path = require('path')
const chalk = require('chalk')
const { spawn } = require('child_process');
const nodemon = require('nodemon')
const detect = require('detect-port');

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

const getNoUsePort = async (port = 1000) => {
  try {
    const _port = await detect(port);

    if (_port === port) {
      return port
    } else {
      return await getNoUsePort(++port)
    }
  } catch (error) {
    console.log(error)
  }
}

const server = async () => {
  const port = await getNoUsePort(1000)

  const Server = require('@pkb/node-box')
  Server({port, root: path.join(__dirname, '..')})
  // nodemon({
  //   script: require('')
  // })

}
