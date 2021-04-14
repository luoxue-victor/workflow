module.exports = function ({ injectCommand, api }) {
  injectCommand(({ program, cleanArgs, boxConfig }) => {
    program
      .command('inspect [paths...]')
      .description('inspect the webpack config in a project with vue-cli-service')
      .option('--mode <mode>')
      .option('--rule <ruleName>', 'inspect a specific module rule')
      .option('--plugin <pluginName>', 'inspect a specific plugin')
      .option('--rules', 'list all module rule names')
      .option('--plugins', 'list all plugin names')
      .option('-v --verbose', 'Show full function definitions in output')
      .action((name, cmd) => {
        const options = cleanArgs(cmd)
        const args = Object.assign(options, { name }, boxConfig)
        require('../build/inspect')(args, api)
      })
  })
}
