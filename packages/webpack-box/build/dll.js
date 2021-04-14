module.exports = function (options) {
  const path = require('path')
  const dllPath = path.join(process.cwd(), 'dll')
  const Config = require('webpack-chain')
  const config = new Config()
  const webpack = require('webpack')
  const rimraf = require('rimraf')
  const ora = require('ora')
  const chalk = require('chalk')
  const BundleAnalyzerPlugin = require('../config/BundleAnalyzerPlugin')(
    config
  )

  if (options.report) BundleAnalyzerPlugin()
  if (options.dll && !Array.isArray(options.dll.venders)) { throw console.log('请添加 dll.entry') }

  options.dll.venders.forEach((_) => config
    .entry('dll')
    .add(_)
    .end())

  config
    .set('mode', 'production')
    .output.path(dllPath)
    .filename('[name].js')
    .library('[name]')
    .end()
    .plugin('DllPlugin')
    .use(webpack.DllPlugin, [
      {
        name: '[name]',
        path: path.join(process.cwd(), 'dll', 'manifest.json')
      }
    ])
    .end()

  rimraf.sync(path.join(process.cwd(), 'dll'))
  const spinner = ora('开始构建项目...')
  spinner.start()

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
      process.exit(1)
    }
    console.log(chalk.cyan('build完成\n'))
  })
}
