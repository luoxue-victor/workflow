module.exports = function({ injectCommand }) {
  injectCommand(function({ program, cleanArgs, boxConfig }) {
    program
      .command('server:gql [app-page]')
      .description('服务端渲染 gql')
      .action(async (name, cmd) => {
        // const options = cleanArgs(cmd)
        // const args = Object.assign(options, { name }, boxConfig)
        require('../server/start')
      })
  })
}
