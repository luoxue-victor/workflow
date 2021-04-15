/**
 * @name rollup-plugin-dev
 * @description 开发模式
 */
// const dev = require('rollup-plugin-dev')
const dev = require('rollup-plugin-serve')
const chalk = require('chalk')

module.exports = (config = {}) => {
  const devConfig = config.dev || {}

  process.env.NODE_ENV === 'development' && dev(Object.assign({
    openPage: './index.html',
    contentBase: './dist',
    historyApiFallback: true,
    host: '::',
    port: 6000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    onListening(server) {
      const address = server.address()
      const host = address.address === '::' ? 'localhost' : address.address
      const protocol = this.https ? 'https' : 'http'
      console.log(`Server listening at ${chalk.cyan(`${protocol}://${host}:${address.port}/`)}`)
      console.log()
    }
  }, devConfig))
}
