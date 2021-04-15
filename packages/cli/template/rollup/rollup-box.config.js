const path = require('path')

function resolve(dir) {
  return path.join(process.cwd(), dir)
}

module.exports = function (config) {
  return {
    input: {
      input: path.join(process.cwd(), 'src', 'index.ts'),
    },
    output: {
      dir: 'dist',
      format: 'es',
      sourcemap: true
    },
    dev: {
      port: 6002,
      host: '::', // ipv6
      dirs: ['dist'],
      basePath: '/',
      openPage: './index.html',
      contentBase: './dist',
    },
    alias: [
      { find: '@src', replacement: resolve('src') },
    ]
  }
}
