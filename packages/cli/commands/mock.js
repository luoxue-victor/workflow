const http = require('http')
const fs = require('fs')

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('mock')
    .description('mock 数据')
    .action(async () => {
    })
}
