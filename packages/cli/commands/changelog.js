const execa = require('execa')
const fs = require('fs-extra')
const path = require('path')
const conventionalChangelog = require('conventional-changelog');

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('changelog')
    .description('生成 changelog')
    .action(async () => {
      const writeStream = fs.createWriteStream(path.join(process.cwd(), 'CHANGELOG.md'))

      conventionalChangelog({
        preset: 'angular'
      })
      .pipe(writeStream)

        // .pipe(process.stdout)
        // .on('data', (line) => {
        //   console.log(line.toString())
        // })
    })
}
