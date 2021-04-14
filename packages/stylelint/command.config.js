module.exports = function ({ injectCommand, api }) {
  injectCommand(({ program, cleanArgs, boxConfig }) => {
    program
      .command('stylelint')
      .description('修复 stylelint')
      .action(async (cmd) => {
        const options = cleanArgs(cmd)
        const args = Object.assign(options, boxConfig)
        require('./lint')({ args, api })
      })
  })
}
