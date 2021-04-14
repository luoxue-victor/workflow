/**
 * @name @rollup/plugin-image
 * @description 将图片转成 base64 打包在js中
 * @example
 * import logo from './rollup.png';
 * console.log(logo);
 */
const image = require('@rollup/plugin-image')

module.exports = () => image()
