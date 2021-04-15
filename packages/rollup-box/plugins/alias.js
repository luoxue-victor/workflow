/**
 * @name @rollup/plugin-alias
 * @description 定义别名
 * @example
 * import a from '@src/moudleA'
 */
const alias = require('@rollup/plugin-alias')
const path = require('path')

module.exports = (options) => {
  const aliasConfig = options.alias || []
  alias({
    entries: [
      { find: '@src', replacement: path.join(process.cwd(), 'src') },
      ...aliasConfig
    ]
  })
}
