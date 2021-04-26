const { createServer, getPlugins } = require('../index')

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('server')
    .description('开发')
    .action(async () => {
      server()
    })
}

function server() {
  const plugins = getPlugins();
  createServer({ plugins })
}
