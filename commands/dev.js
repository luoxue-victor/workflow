module.exports = function({ injectCommand }) {
  injectCommand(function({ program, cleanArgs, boxConfig }) {
    program
      .command('dev [app-page]')
      .description('构建开发环境')
      .option('-d, --dll', '合并差分包')
      .action(async (name, cmd) => {
        process.env.NODE_ENV = 'development'
        const options = cleanArgs(cmd)
        const args = Object.assign(options, { name }, boxConfig)
        require('../build/dev')(args)
      })
  })
}
