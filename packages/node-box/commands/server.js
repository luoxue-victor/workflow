exports.registerCommand = (params) => {
  const { program, cleanArgs } = params
  program
    .command('server')
    .description('构建开发环境')
    .action((cmd) => {
      const options = cleanArgs(cmd)
      build(options)
    })
}

const build = async () => {
  require('../build/server')()
}
