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
  const { builder, plugins, MODE } = require('../index')

  builder(MODE.WATCH, plugins)
}
