const resolve = require('@rollup/plugin-node-resolve').default

/**
 * @resolve @rollup/plugin-node-resolve
 * @description
 */
module.exports = () => {
  const extensions = ['.cjs', '.js', '.jsx', '.json', '.ts', '.tsx', '.css', '.png'];

  return [
    resolve({
      extensions: extensions,
      browser: true
    })
  ]
};
