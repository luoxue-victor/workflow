// [mini-css-extract-plugin 配置]
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = ({ config }) => {
  return () => {
    config
      .plugin('mini-css-extract')
      .use(MiniCssExtractPlugin)
  }
}
