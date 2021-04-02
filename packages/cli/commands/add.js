const minimist = require('minimist')

exports.registerCommand = (params) => {
  const { program } = params
  program
    .command('add [plugin] [pluginOptions]')
    .description('安装插件并在已创建的项目中调用其生成器')
    .action(async (plugin, options = {}) => {
      if (plugin) {
        require('../lib/add')(plugin, minimist(process.argv.slice(3)))
      } else {
        const path = require('path')
        const Creator = require('../lib/Creator')
        const cwd = options.cwd || process.cwd()
        const inCurrent = '.'
        const name = inCurrent ? path.relative('../', cwd) : ''
        const targetDir = path.resolve(cwd, '.')
        const { getPromptModules } = require('../lib/util/createTools')
        const creator = new Creator(name, targetDir, getPromptModules())
        await creator.create({})
      }
    })
}
