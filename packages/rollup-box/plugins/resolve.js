const resolve = require('@rollup/plugin-node-resolve').default

/**
 * @name @rollup/plugin-node-resolve
 * @description
 */
module.exports = () => {
  const extensions = ['.cjs', '.js', '.jsx', '.json', '.ts', '.tsx', '.css', '.png']

  return [
    resolve({
      extensions,
      browser: true
    })
  ]
}
