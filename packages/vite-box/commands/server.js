const { createServer, getPlugins } = require('../index')

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('server')
    .description('开发')
    .action(async (plugin, options = {}) => {
      exports.server()
    })
}

exports.server = function() {
  const plugins = getPlugins();
  createServer({plugins})
}
