/**
 * import logo from './rollup.png';
 * console.log(logo);
 */
const image = require('@rollup/plugin-image')

module.exports = () => {
  return image()
}
