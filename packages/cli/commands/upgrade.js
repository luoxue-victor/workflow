exports.registerCommand = (params) => {
  const { program, cleanArgs } = params
  program
    .command('upgrade [filter]')
    .description('更新项目依赖')
    .action((filter, cmd) => {
      const options = cleanArgs(cmd)
      options.filter = filter || '@pkb/*'
      require('../lib/upgrade')(options)
    })
}
