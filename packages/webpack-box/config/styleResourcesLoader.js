// [设置 style 全局变量]
/**
 * @name global style
 * @description 全局样式变量
 */
module.exports = ({ config, options }) => {
  const resourcesOpt = options.resources
  return () => {
    [
      'normal'
    ].forEach((oneOf) => {
      Object.keys(resourcesOpt).forEach((loader) => {
        config.module.rule(loader).oneOf(oneOf)
          .use('style-resources-loader')
          .loader('style-resources-loader')
          .options({
            patterns: resourcesOpt[loader].patterns
          })
      })
    })
  }
}
