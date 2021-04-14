module.exports = function (options) {
  return new Promise((resolve, reject) => {
    const rimraf = require('rimraf')
    const ora = require('ora')
    const chalk = require('chalk')
    const path = require('path')
    // 删除 dist 目录
    rimraf.sync(path.join(process.cwd(), options.pages[options.name].output))

    const config = require('./base')(options)
    const webpack = require('webpack')
    const spinner = ora('开始构建项目...')
    spinner.start()

    if (typeof options.chainWebpack === 'function') {
      options.chainWebpack(config)
    }

    webpack(config.toConfig(), (err, stats) => {
      spinner.stop()
      if (err) throw err
      process.stdout.write(
        `${stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        })}\n\n`
      )

      if (stats.hasErrors()) {
        console.log(chalk.red('构建失败\n'))
        reject()
        process.exit(1)
      }

      resolve(true)
      console.log(chalk.cyan('build完成\n'))
    })
  })
}
