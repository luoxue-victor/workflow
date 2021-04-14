/**
 * @name @rollup/plugin-auto-install
 * @description 自动安装依赖
 */
const auto = require('@rollup/plugin-auto-install')

module.exports = () => [
  auto()
]
