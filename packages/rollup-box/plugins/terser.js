/**
 * rollup-plugin-terser
 * 代码压缩
 */
const { terser } = require('rollup-plugin-terser')

module.exports = () => {
  return terser()
}
