const globy = require('globby')
const prettyTree = require('pretty-file-tree')

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('tree [path]')
    .description('查找文件')
    .action(async (path = 'src') => {
      const rs = await exports.tree(path)

      console.log(rs)
    })
}

exports.tree = async (path, options) => {
  return prettyTree(await globy(path, options))
}