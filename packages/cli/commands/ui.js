const path = require('path')

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('ui')
    .description('cli ui，界面话')
    .action(async (plugin, options = {}) => {
      const {createServer, getPlugins} = require('@pkb/vite-box')

      const plugins = getPlugins();

      createServer(plugins, 8888, path.join(__dirname, '..'))
    })
}
