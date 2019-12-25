module.exports = function({ injectCommand, api }) {
  injectCommand(function({ program, cleanArgs, boxConfig }) {
    program
      .command('tslint')
      .description('修复 tslint')
      .action(async (cmd) => {
        const options = cleanArgs(cmd)
        const args = Object.assign(options, boxConfig)
        require('./lint')({ args, api })
      })
  })
}
