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
  process.env.NODE_ENV = 'prod'
  const { builder, getPlugins, MODE } = require('../index')

  builder(MODE.BUILD, getPlugins())
}
