// gotty -w -p 8880 --permit-arguments gd-cli ajx dev
// doc https://github.com/yudai/gotty
const { tryUsePort } = require('../util')
const chalk = require('chalk')
const execa = require('execa')

const registerCommand = ({program}) => {
  program
    .command('gotty [projectPath]')
    .description('web 终端')
    .action(async (projectPath) => {
      const http = await gotty(projectPath, ['sh'], 6666)
      console.log(http)
    })
}

function gotty (projectName, cmd, port = 6666) {
  return new Promise((resolve) => {
    tryUsePort(port, function (port) {
      const child = execa('gotty', ['-w', '-p', port, '--permit-arguments', ...cmd], {
        cwd: projectName || process.cwd(),
        // stdio: ['inherit', 'inherit', 'inherit']
      })

      child.on('error', function(err) {
        if (err.code === 'ENOENT') {
          console.log(chalk.red(`您没有安装 gotty，请移驾 ${chalk.yellow('https://github.com/yudai/gotty')} 安装后使用`))
          process.exit(0)
        } else {
          console.log(err)
        }
      })

      child.stdout.on('data', function (data) {
        const str = data.toString().replace(/\n$/, '')
        console.log(str);
      });

      resolve(chalk.cyan(`http://127.0.0.1:${port}/`))
    });
  })
}

Object.assign(exports, {
  registerCommand,
  gotty
})
