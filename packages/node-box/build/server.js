const path = require('path')
const nodemon = require('nodemon')
const chalk = require('chalk')

module.exports = ({ root } = {}) => {
  process.env.NODE_ENV = 'development'
  process.env.SERVER_ROOT = root || process.cwd()

  const server = nodemon({
    script: path.join(__dirname, '..', 'nodemon.js'),
    ignoreRoot: ['**/src/**', 'node_modules/**']
  })

  server.addListener('restart', (file) => {
    const changeName = file[0].replace(process.env.SERVER_ROOT, '')

    console.log(chalk.cyan('[变更]'), chalk.yellow('[server]'), changeName)
  })
}
