module.exports = function({ cliName, injectCommand }) {
  injectCommand(function({ program, cleanArgs, boxConfig }) {
    program
      .command(`${cliName} <v>`)
      .description('webpack版本，输入 4 或 5 ')
      .action(async (name, cmd) => {
        const options = cleanArgs(cmd)
        const args = Object.assign(options, { name }, boxConfig)
        require(`../build/${cliName}`)(args)
      })
  })
}
