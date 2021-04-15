module.exports = function ({ program, api, cleanArgs, config }) {
  program
    .command('stylelint')
    .description('修复 stylelint')
    .action(async (cmd) => {
      const options = cleanArgs(cmd)
      const args = Object.assign(options, config)
      require('./lint')({ args, api })
    })
}
