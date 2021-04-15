exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('watch')
    .description('开发运行项目')
    .action(() => {
      watch()
    })
}

const watch = async () => {
  process.env.NODE_ENV = 'development'
  const { builder, getPlugins, MODE } = require('../index')

  builder(MODE.WATCH, getPlugins())
}
