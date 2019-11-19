const config = require('./base')()

const webpack = require('webpack')
const chalk = require('chalk')

const WebpackDevServer = require('webpack-dev-server')
const port = 8080;
const publicPath = '/common/'

config.devServer
  .quiet(true)
  .hot(true)
  .https(false)
  .disableHostCheck(true)
  .publicPath(publicPath)
  .clientLogLevel('none')

const compiler = webpack(config.toConfig())
// 拿到 devServer 参数
const chainDevServer = compiler.options.devServer
const server = new WebpackDevServer(compiler, Object.assign(chainDevServer, {}))

  ;['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      server.close(() => {
        process.exit(0)
      })
    })
  });
// 监听端口
server.listen(port);

new Promise(() => {
  compiler.hooks.done.tap('dev', stats => {
    const empty = '    '
    const common = `App running at:
    - Local: http://127.0.0.1:${port}${publicPath}\n`
    console.log(chalk.cyan('\n' + empty + common))
  })
})