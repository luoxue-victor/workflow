/**
 * @name rollup-plugin-dev
 * @description 开发模式
 */
// const dev = require('rollup-plugin-dev')
const dev = require('rollup-plugin-serve')
const path = require('path')

module.exports = ({ host = '127.0.0.1', port = 6000, basePath = '/', dirs = ['dist'] }) => {
  // const livereload = require('livereload');
  // const server = livereload.createServer();

  // dirs.forEach(_ => {
  //   server.watch(path.join(process.cwd(), _));
  // })

  // return process.env.NODE_ENV === 'development' && dev({
  //   host,
  //   basePath,
  //   port,
  //   dirs,
  //   silent: true,
  //   spa: 'dist/index.html',
  //   force: true
  // })

  return process.env.NODE_ENV === 'development' && dev({
    openPage: './index.html',
    contentBase: './dist',
    historyApiFallback: true,
    host,
    port,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    onListening: function (server) {
      const address = server.address()
      const host = address.address === '::' ? 'localhost' : address.address
      // by using a bound function, we can access options as `this`
      const protocol = this.https ? 'https' : 'http'
      console.log(`Server listening at ${protocol}://${host}:${address.port}/`)
    }
  })
}
