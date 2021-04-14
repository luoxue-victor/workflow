// [tslint 配置]
/**
 * @name tslint
 * @description ts 检查配置
 */
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
  const path = require('path')
  return () => {
    if (fs.existsSync(path.resolve('tsconfig.json'))) {
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
}
