const replace = require('@rollup/plugin-replace')

/**
 * @name @rollup/plugin-replace
 * @description 代码压缩
 */
module.exports = () => {
  return replace({
    preventAssignment: true,
    values: {
      'process.env.NODE_ENV': JSON.stringify('development')
    }
  })
}
