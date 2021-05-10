const useGotty = require('use-gotty')

const registerCommand = ({program}) => {
  program
    .command('gotty [projectPath]')
    .description('web 终端')
    .action(async (projectPath) => {
      const http = await useGotty(projectPath || process.cwd(), ['sh'], 6666)

      console.log(http)
    })
}

Object.assign(exports, {
  registerCommand
})
