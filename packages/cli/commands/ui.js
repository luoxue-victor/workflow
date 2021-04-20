const path = require('path')
const chalk = require('chalk')
const { spawn } = require('child_process');


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

const server = () => {
  return new Promise((resolve) => {
    const cwd = path.join(__dirname, '..', 'ui-server')
    process.env.PORT = 99999
    const run = () => {
      const devspawn = spawn('npm', ['run', 'dev'], { cwd });

      devspawn.stdout.on('data', function (data) {
        const str = data.toString().replace(/\n$/, '')

        chalk.cyan('[ui-server]')

        const http = str.match(/egg started on (http:\/\/127\.0\.0\.1\:\d+)/)
        if (http) {
          resolve(http[1])
        }

        console.log(str);
      });

      devspawn.on('error', (err, b) => {
        console.log(err, b)
      })
    }
    run()
  })
}
