const livereload = require('rollup-plugin-livereload')

/**
 * @livereload rollup-plugin-livereload
 * @description 自动刷新页面
 */
module.exports = () => {
  return [
    process.env.NODE_ENV === 'development' && livereload('dist')
  ]
};
