exports.registerCommand = (params) => {
  const { program, cleanArgs } = params
  program
    .command('create <app-name>')
    .description('创建一个项目')
    .action((name, cmd) => {
      const options = cleanArgs(cmd)
      require('../lib/create')(name, options)
    })
}
