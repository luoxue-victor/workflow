const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({ config, options }) => {
  let template = 'public/index.html', filename = 'index.html';
  if (options.name) {
    const name = options.name;
    entry = options.pages[name].template;
    filename = options.pages[name].filename;
    publicPath = options.pages[name].publicPath;
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