module.exports = function(injectCommand) {
  injectCommand(function({ program, cleanArgs, boxConfig }) {
    program
      .command('ssr:server [app-page]')
      .description('服务端渲染')
      .action(async (name, cmd) => {
        const options = cleanArgs(cmd)
        const args = Object.assign(options, { name }, boxConfig)
        require('../build/ssr:server')(args)
      })
  })
}
