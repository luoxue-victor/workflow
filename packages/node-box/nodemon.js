const usePort = require('use-port')
const chalk = require('chalk')

;(async () => {
  const port = await usePort(process.env.PORT || 1234)
  const Server = require('./index')
  const root = process.env.SERVER_ROOT || process.cwd()

  console.log(chalk.cyan('server root at:'), chalk.yellow(root))
  
  Server({port, root})
})()
