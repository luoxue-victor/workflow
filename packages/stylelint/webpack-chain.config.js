// [stylelint 配置]
module.exports = ({
  config,
  options: {
    stylelint: {
      lintOnSave = false,
      extensions = ['vue', 'htm', 'html', 'css', 'sss', 'less', 'scss']
    } = {}
  }
}) => {
  const StyleLintPlugin = require('stylelint-webpack-plugin')
  const CodeframeFormatter = require('stylelint-codeframe-formatter')
  const stylelint = []
  return () => {
    if (!lintOnSave) return
    config
      .plugin('stylelint')
      .use(StyleLintPlugin, [{
        failOnError: lintOnSave === 'error',
        files: [`src/**/*.{${extensions.join()}}`],
        formatter: CodeframeFormatter,
        ...stylelint
      }])
      .end()
      .plugin('friendly-errors')
      .tap(([options]) => {
        ['Transformers', 'Formatters'].forEach((name) => {
          const optKey = `additional${name}`
          let plugins
          if (Array.isArray(options[optKey])) {
            plugins = options[optKey]
          } else {
            plugins = []
            Object.assign(options, { [optKey]: plugins })
          }

          let plugin
          try {
            const pluginName = name.toLowerCase().slice(0, -1)
            plugin = require('./stylelintError')[pluginName]
          } catch (e) {
            return
          }

          plugin && plugins.push(plugin)
        })
        return [options]
      })
  }
}
