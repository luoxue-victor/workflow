module.exports = function({ injectCommand }) {
  injectCommand(function({ program }) {
    const chalk = require('chalk')
    program
      .command('info')
      .description('打印有关环境的调试信息')
      .action(() => {
        console.log(chalk.cyanBright('\n 正在搜检环境信息:'))
        require('envinfo').run(
          {
            System: ['OS', 'CPU'],
            Binaries: ['Node', 'Yarn', 'npm'],
            Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
            npmPackages: '/**/{*webpack*,*babel*,typescript,*pkb*}',
            npmGlobalPackages: ['@pkb/cli']
          },
          {
            showNotFound: true,
            duplicates: true,
            fullTree: true
          }
        ).then(info => console.log(chalk.greenBright(info)))
      })
  })
}
