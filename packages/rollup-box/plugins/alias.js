/**
 * @rollup/plugin-alias
 * @example
 * import a from '@src/moudleA'
 */
const alias = require('@rollup/plugin-alias')
const path = require('path')

module.exports = () => {

  return alias({
    entries: [
      { find: '@src', replacement: path.join(process.cwd(), 'src') }
    ]
  })
}
