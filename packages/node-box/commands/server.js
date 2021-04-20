exports.registerCommand = (params) => {
  const { program, cleanArgs } = params
  program
    .command('server')
    .description('开发运行项目')
    .action((cmd) => {
      const options = cleanArgs(cmd)
      dev(options)
    })
}

const dev = async () => {
  require('..')()
}
