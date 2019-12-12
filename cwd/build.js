module.exports = function({ injectCommand }) {
  injectCommand(function({ program, cleanArgs, boxConfig }) {
    program
      .command('build [app-page]')
      .description('构建生产环境')
      .option('-r, --report', '打包分析报告')
      .option('-d, --dll', '合并差分包')
      .action(async (name, cmd) => {
        const options = cleanArgs(cmd)
        const args = Object.assign(options, { name }, boxConfig)
        process.env.NODE_ENV = 'production'
        if (!name && boxConfig.pages) {
          args.clear = true
          Object.keys(boxConfig.pages).forEach(page => {
            args.name = page
            require('../build/build')(args)
          })
        } else {
          require('../build/build')(args)
        }
      })
  })
}
