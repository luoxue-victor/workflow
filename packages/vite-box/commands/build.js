const { build } = require('../index')

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('build')
    .description('构建项目')
    .action(async () => {
      build({})
    })
}
