module.exports = function({ injectCommand }) {
  injectCommand(function({ program, cleanArgs, boxConfig }) {
    program
      .command('build:ssr [app-page]')
      .description('服务端渲染 server 端运行')
      .action(async (name, cmd) => {
        const options = cleanArgs(cmd)
        const args = Object.assign(options, { name }, boxConfig)
        require('../build/build:ssr')(args)
      })
  })
}
