module.exports = function (options) {
  const config = require('./base')(options)
  const webpack = require('webpack')
  const chalk = require('chalk')
  const WebpackDevServer = require('webpack-dev-server')
  const port = options.port || 8080
  const publicPath = options.publicPath || '/'

  config.devServer
    .quiet(true)
    .hot(true)
    .https(false)
    .disableHostCheck(true)
    .publicPath(publicPath)
    .clientLogLevel('none')

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
      docker()
      console.log(chalk.cyan('\n' + empty + common))
    })
  })
}

function docker () {
  try {
    const getDockerHost = require('get-docker-host')
    const isInDocker = require('is-in-docker')

    const checkDocker = () => {
      return new Promise((resolve, reject) => {
        if (isInDocker()) {
          getDockerHost((error, result) => {
            if (result) {
              resolve(result)
            } else {
              reject(error)
            }
          })
        } else {
          resolve(null)
        }
      })
    }

    checkDocker().then((addr) => {
      if (addr) {
        console.log('Docker host is ' + addr)
      } else {
        console.log('Not in Docker')
      }
    }).catch((error) => {
      console.log('Could not find Docker host: ' + error)
    })
  } catch (error) {
    console.error(error)
  }
}
