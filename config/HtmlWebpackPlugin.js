const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({ config, options }) => {
  let template = 'public/index.html', filename = 'index.html', title = 'asdasd';
  if (options.name) {
    const name = options.name;
    entry = options.pages[name].template;
    filename = options.pages[name].filename;
    title = options.pages[name].title;
  }
  return () => {
    config.plugin('html')
      .use(HtmlWebpackPlugin, [{
        template,
        filename,
        title
      }])
  }
}