const chalk = require('chalk')

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('build')
    .description('构建项目')
    .option('-d, --detail', '细节描述')
    .action(async (cwd) => {

    })
}
