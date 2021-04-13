/**
 * @name @rollup/plugin-typescript
 * @description 支持ts
 */
const typescript = require('@rollup/plugin-typescript')

module.exports = () => {
  return typescript(/* { plugin options } */)
}
