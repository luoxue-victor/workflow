exports.registerCommand = (params) => {
  const { program, cleanArgs } = params
  program
    .command('stylelint')
    .description('style 代码检查')
    .action((cmd) => {
      require('@pkb/plugin-stylelint/lint')()
    })
}
