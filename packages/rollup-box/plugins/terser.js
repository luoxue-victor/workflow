/**
 * @name rollup-plugin-terser
 * @description 代码压缩
 */
const { terser } = require('rollup-plugin-terser')

module.exports = () => terser()
