// https://www.npmjs.com/package/npm-check-updates
const ncu = require('npm-check-updates')
const PackageManager = require('../util/ProjectPackageManager')

exports.registerCommand = (params) => {
  const { program, cleanArgs } = params
  program
    .command('upgrade [filter]')
    .description('更新项目依赖')
    .action((filter) => {
      const options = {}
      options.filter = filter || '@pkb/*'
      exports.upgrade(options)
    })
}

exports.upgrade = async ({ filter }) => {
  const upgraded = await ncu.run({
    jsonUpgraded: true,
    filter: filter || '@pkb/*',
    upgrade: true,
    silent: true
  })

  const keys = Object.keys(upgraded)
  if (keys.length) {
    console.log(`升级了 ${keys.length} 项`)
    console.log(upgraded)
    const pm = new PackageManager({ context: process.cwd() })

    await pm.install()
  } else {
    console.log('已经是最新版本，没有可更新的依赖')
  }
}
