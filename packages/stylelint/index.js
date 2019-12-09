const StyleLintPlugin = require('stylelint-webpack-plugin')
const CodeframeFormatter = require('stylelint-codeframe-formatter')

module.exports = (api, projectOptions) => {
  const { pluginOptions: { lintOnSave, stylelint } } = projectOptions
  if (lintOnSave) {
    api.chainWebpack((webpackConfig) => {
      webpackConfig
        .plugin('stylelint')
        .use(StyleLintPlugin, [Object.assign({
          failOnError: lintOnSave === 'error',
          files: ['src/**/*.{vue,htm,html,css,sss,less,scss}'],
          formatter: CodeframeFormatter
        }, stylelint)])
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
    })
  }
}
