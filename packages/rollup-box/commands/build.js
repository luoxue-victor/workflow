exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('build')
    .description('构建项目')
    .action(() => {
      build()
    })
}

const build = async () => {
  const { builder, plugins, MODE } = require('../index')

  builder(MODE.BUILD, plugins)
}
