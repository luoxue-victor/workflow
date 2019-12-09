module.exports = (api, options = {}) => {
  const fs = require('fs')
  const useThreads = process.env.NODE_ENV === 'production' && !!options.parallel
  const { pluginOptions: { lintOnSave } } = options
  api.chainWebpack(config => {
    if (lintOnSave) {
      config
        .plugin('fork-ts-checker')
        .use(require('fork-ts-checker-webpack-plugin'), [{
          vue: true,
          tslint: lintOnSave !== false && fs.existsSync(api.resolve('tslint.json')),
          formatter: 'codeframe',
          // https://github.com/TypeStrong/ts-loader#happypackmode-boolean-defaultfalse
          checkSyntacticErrors: useThreads
        }])
    }
  })
}
