// [html-webpack-plugin 生成html]
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
/**
 * @name html-webpack-plugin
 * @description 生成html
 */
module.exports = ({ config, options }) => {
  let template = path.join(process.cwd(), 'public/index.html')
  let publicPath = options.publicPath || '/'
  let filename = options.filename || 'index.html'

  if (options.name) {
    const { name } = options
    filename = options.pages[name].filename
    publicPath = options.pages[name].publicPath
    template = options.pages[name].template
  }

  return () => {
    config.plugin('html')
      .use(HtmlWebpackPlugin, [{
        template,
        filename,
        publicPath
      }])
  }
}
