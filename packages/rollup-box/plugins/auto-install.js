/**
 * @name @rollup/plugin-auto-install
 * @description 自动安装依赖
 */
const auto = require('@rollup/plugin-auto-install')
const resolve = require('@rollup/plugin-node-resolve').default

module.exports = () => {
  return [
    auto(),
    resolve()
  ]
};
