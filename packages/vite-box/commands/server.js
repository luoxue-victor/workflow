const { createServer, getPlugins } = require('../index')

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('server')
    .description('开发')
    .action(async (plugin, options = {}) => {
      const plugins = getPlugins();
      createServer(plugins)
    })
}
