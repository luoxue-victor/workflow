module.exports = function ({ program, api, cleanArgs, config }) {
  program
    .command('eslint')
    .description('修复 eslint')
    .action(async (cmd) => {
      const options = cleanArgs(cmd)
      const args = Object.assign(options, config)
      require('./lint')({ args, api })
    })
}
