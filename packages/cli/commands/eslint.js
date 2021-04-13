exports.registerCommand = (params) => {
  const { program, cleanArgs } = params
  program
    .command('eslint')
    .description('js代码检查')
    .action((cmd) => {
      require('@pkb/plugin-eslint/lint')({})
    })
}
