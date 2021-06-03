const chalk = require('chalk')
const { execSync } = require('child_process')
const fs = require('fs')

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('find [findPath] [str]')
    .description('查找文件')
    .action(async (findPath, str) => {
      let log = execSync(
        `find . `
        + ` -name '**node_modules**' -prune -o `
        + ` -name '**.git**' -prune -o `
        + ` -name '**output**' -prune -o `
        + ` -iname ${findPath} -a -print `
      )

      if (log) {
        log = log.toString()
      }

      const paths = log.split('\n').filter(_ => _)

      if (paths && paths.length && str) {
        paths.forEach(p => {
          
          const content = fs.readFileSync(p,{
            encoding: 'utf-8'
          })
          const reg = new RegExp(`[^\n]*${str}[^\n]*\n`, 'g')
          const match = content.match(reg)
  
          if (match && match.length) {
            console.log(chalk.cyan(`[文件] ${p}`))
            match.forEach((_, i) => {
              console.log(`[${i}] ${_.replace(str, chalk.yellow(str)).trim()}`)
            })
          }
        })
      } else {
        console.log(paths)
      }
    })
}
