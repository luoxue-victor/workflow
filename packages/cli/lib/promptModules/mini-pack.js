module.exports = cli => {
  cli.injectFeature({
    name: 'mini-pack [小体积库打包，使用rollup]',
    value: 'mini-pack',
    short: 'mini-pack',
    description: '小体积库打包',
    link: 'https://github.com/luoxue-victor/mini-pack',
    plugins: ['@jijiang/box-plugin-mini-pack'],
    checked: true
  })
  cli.onPromptComplete((answers, options) => {
    if (answers.features.includes('mini-pack')) {
      options.plugins['@jijiang/box-plugin-mini-pack'] = {
        replace: true
      }
    }
  })
}
