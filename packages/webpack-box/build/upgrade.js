module.exports = function (options) {
  const path = require('path')
  const fs = require('fs')
  const chalk = require('chalk')

  const PackageManager = require('../util/ProjectPackageManager')
  const pkgPath = path.join(process.cwd(), 'package.json')
  const pkg = require(pkgPath)
  const pm = new PackageManager({
    context: process.cwd()
  })

  createPkg(options.name)

  async function createPkg(v) {
    Object.assign(pkg.dependencies, strategyV(v))
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
    await pm.install()
    console.log()
    console.log(chalk.cyan(`安装 ${v} 完毕`))
    console.log()
  }

  function strategyV(v) {
    console.log()
    console.log(chalk.cyan(`正在安装webpack版本${v}...`))
    console.log()
    if (v === '5') {
      return {
        'html-webpack-plugin': '^4.5.0',
        webpack: '^5.11.0'
      }
    }
    return {
      'html-webpack-plugin': '^3.2.0',
      webpack: '^4.41.2'
    }
  }
}
