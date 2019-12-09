module.exports = function (options) {
  const path = require('path')
  const Config = require('webpack-chain')
  const config = new Config()
  const webpack = require('webpack')
  const rimraf = require('rimraf')
  const ora = require('ora')
  const chalk = require('chalk')
  const PATHS = {
    build: path.join(process.cwd(), 'static'),
    ssrDemo: path.join(process.cwd(), 'src', 'ssr.jsx')
  }

  require('../config/babelLoader')({ config, tsx: true })()
  require('../config/HtmlWebpackPlugin')({
    config,
    options: {
      publicPath: '/',
      filename: 'client.ssr.html'
    }
  })()

  config
    .entry('ssr')
    .add(PATHS.ssrDemo)
    .end()
    .set('mode', 'development') //  production
    .output.path(PATHS.build)
    .filename('[name].js')
    .libraryTarget('umd')
    .globalObject('this')
    .library('[name]')
    .end()

  rimraf.sync(path.join(process.cwd(), PATHS.build))
  const spinner = ora('开始构建项目...')
  spinner.start()

  webpack(config.toConfig(), function(err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    )

    if (stats.hasErrors()) {
      console.log(chalk.red('构建失败\n'))
      process.exit(1)
    }
    console.log(chalk.cyan('build完成\n'))
  })
}
