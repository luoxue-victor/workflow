module.exports = function ({ injectCommand, api }) {
  injectCommand(({ program, cleanArgs, boxConfig }) => {
    program
      .command('eslint')
      .description('修复 eslint')
      .action(async (cmd) => {
        const options = cleanArgs(cmd)
        const args = Object.assign(options, boxConfig)
        require('./lint')({ args, api })
      })
  })
}
