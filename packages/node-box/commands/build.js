exports.registerCommand = (params) => {
  const { program, cleanArgs } = params
  program
    .command('build [port] [path]')
    .description('构建生产项目')
    .action((port, path, cmd) => {
      const options = cleanArgs(cmd)
      build(port, path, options)
    })
}

const build = async (port, path) => {
  require('../build/build')({port, root: path})
}
