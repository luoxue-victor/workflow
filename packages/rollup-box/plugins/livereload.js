const livereload = require('rollup-plugin-livereload')

/**
 * @name rollup-plugin-livereload
 * @description 自动刷新页面
 */
module.exports = () => [
  process.env.NODE_ENV === 'development' && livereload('dist')
]
