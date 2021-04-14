module.exports = function ({ injectCommand }) {
  injectCommand(({ program, cleanArgs, boxConfig }) => {
    program
      .command('dll [app-page]')
      .description('编译差分包')
      .action(async (name, cmd) => {
        const options = cleanArgs(cmd)
        const args = Object.assign(options, { name }, boxConfig)
        require('../build/dll')(args)
      })
  })
}
