// [tslint 配置]
module.exports = ({
  config,
  options: {
    tslint: {
      lintOnSave = false,
      useThreads = false
    } = {}
  },
  api
}) => {
  const fs = require('fs')
  return () => {
    config
      .plugin('fork-ts-checker')
      .tap(([options]) => {
        options.tslint = lintOnSave !== false && fs.existsSync(api.resolve('tslint.json'))
        options.formatter = 'codeframe'
        options.checkSyntacticErrors = useThreads
        return [options]
      })
  }
}
