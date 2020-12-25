const spawn = require('child_process').spawn

const registerCommand = ({ program, cleanArgs, utils, exec }) => {
  program
    .command('pull')
    .description('拉取最新代码')
    .action((cmd) => {
      pull({ args: cleanArgs(cmd), utils, exec })
    })
}

const pull = ({ utils }) => {
  free = spawn('git', ['pull', 'origin', utils.getCurBranch()])

  free.stdout.on('data', function (data) {
    const str = data.toString().replace(/\n$/, '')
    console.log(str)
  })
}

Object.assign(exports, {
  registerCommand,
  pull
})
