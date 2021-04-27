const fs = require('fs-extra')
const path = require('path')
const conventionalChangelog = require('conventional-changelog')
const _ = require('lodash')

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('changelog')
    .description('生成 changelog')
    .action(async () => {
      const writeStream = fs.createWriteStream(path.join(process.cwd(), 'CHANGELOG.md'))
      const options = _.omitBy({
        preset: 'angular',
        releaseCount: 0,
      }, _.isUndefined)

      conventionalChangelog(options, process.cwd() /* gitRawCommitsOpts, config.parserOpts, config.writerOpts */)
        .pipe(writeStream)
    })
}
