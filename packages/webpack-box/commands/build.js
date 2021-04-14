const chalk = require('chalk')

module.exports = function ({ injectCommand }) {
  injectCommand(({ program, cleanArgs, boxConfig }) => {
    program
      .command('build [app-page]')
      .description('构建生产环境')
      .option('-r, --report', '打包分析报告')
      .option('-d, --dll', '合并差分包')
      .action(async (name, cmd) => {
        process.env.NODE_ENV = 'production'
        const options = cleanArgs(cmd)
        const args = Object.assign(options, { name }, boxConfig)
        if (!name && boxConfig.pages) {
          const pagesName = Object.keys(boxConfig.pages)

          for (let index = 0; index < pagesName.length; index++) {
            args.name = pagesName[index]
            console.log()
            console.log(chalk.cyan(`开始构建 --> ${args.name}页面`))
            console.log()
            await require('../build/build')(args)
          }
        }
      })
  })
}
