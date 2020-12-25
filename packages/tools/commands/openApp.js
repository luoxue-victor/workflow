const exec = require('child_process').execSync

const registerCommand = ({ program }) => {
  program
    .command('open <appname> [path]')
    .description('打开 app')
    .action((appname, path) => {
      openApp({ appname, path })
    })
}

const openApp = ({ appname, path }) => {
  const commander = `open -a /Applications/${appname}.app ${path || ''}`

  exec(commander)
}

Object.assign(exports, {
  registerCommand,
  openApp
})
