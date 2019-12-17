module.exports = function (options) {
  const config = require('./base')(options)
  const webpack = require('webpack')
  const chalk = require('chalk')
  const WebpackDevServer = require('webpack-dev-server')
  const port = options.port || 8080
  const publicPath = options.publicPath || '/'
  // const createMockMiddleware = require('../lib/createMockMiddleware')

  config.devServer
    .quiet(true)
    .hot(true)
    .https(false)
    .disableHostCheck(true)
    .publicPath(publicPath)
    .clientLogLevel('none')
    // .before(app => {
    //   // try {
    //   //   app.use(createMockMiddleware())
    //   // } catch (error) {
    //   //   console.error(error)
    //   //   process.exit()
    //   // }
    //   // require('../server/start')
    // })

  if (typeof options.chainWebpack === 'function') {
    options.chainWebpack(config)
  }

  const compiler = webpack(config.toConfig())
  // 拿到 devServer 参数
  const chainDevServer = compiler.options.devServer
  const server = new WebpackDevServer(
    compiler,
    Object.assign(chainDevServer, {})
  );

  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      server.close(() => {
        process.exit(0)
      })
    })
  })
  // 监听端口
  server.listen(port)

  new Promise(() => {
    compiler.hooks.done.tap('dev', stats => {
      const empty = '    '
      const common = `
    App running at:
    - dev  at: http://localhost:${port}${publicPath}
${options.mock ? `    - mock at: http://localhost:${port}/api/users/12` : ''}
`
      console.log(chalk.cyan('\n' + empty + common))
    })
  })
}
