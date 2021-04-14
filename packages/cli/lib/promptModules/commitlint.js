module.exports = (cli) => {
  cli.injectFeature({
    name: 'commitlint [代码提交规范检查]',
    value: 'commitlint',
    short: 'commitlint',
    description: '代码提交规范检查',
    link: 'https://github.com/luoxue-victor/commitlint',
    plugins: ['commitlint'],
    checked: true
  })

  cli.onPromptComplete((answers, options) => {
    if (answers.features.includes('commitlint')) {
      options.plugins['vue-cli-plugin-commitlint'] = {
        replace: true
      }
    }
  })
}
