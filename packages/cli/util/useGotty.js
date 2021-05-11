const usePort = require('use-port');
const chalk = require('chalk')
const execa = require('execa')
const fs = require('fs')

const useGotty = async (projectPath, cmd, port = 6666) => {
  return new Promise(async (resolve) => {
    
    if (!fs.existsSync(projectPath)) {
      console.log(projectPath, '不存在')
      return
    }

    const _port = await usePort(port)

    if (typeof cmd === 'string') {
      cmd = cmd.split(' ').filter(_ => _.trim())
    }
    
    const child = execa('gotty', ['-w', '-p', _port, '--permit-arguments', ...cmd], {
      cwd: projectPath || process.cwd(),
    })

    child.on('error', function(err) {
      if (err.code === 'ENOENT') {
        console.log(chalk.red(`您没有安装 gotty，请移驾 ${chalk.yellow('https://github.com/yudai/gotty')} 安装后使用`))
        console.log(err)
      } else {
        console.log(err)
      }
    })

    child.stdout.on('data', function (data) {
      const str = data.toString().replace(/\n$/, '')
      console.log(str);
    });

    resolve(`http://127.0.0.1:${_port}/`)
  })
}

module.exports = useGotty