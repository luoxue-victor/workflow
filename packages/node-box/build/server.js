const path = require('path')
const nodemon = require('nodemon')
const chalk = require('chalk')

module.exports = ({ root }) => {
  process.env.NODE_ENV = 'development'
  process.env.SERVER_ROOT = root

  const server = nodemon({
    script: path.join(__dirname, '..', 'nodemon.js')
  })

  server.addListener('restart', (file) => {
    const changeName = file[0].replace(process.cwd(), '')

    console.log(chalk.cyan('[变更]'), changeName)
  })
}
