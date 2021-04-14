const execa = require('execa')
const path = require('path')
const fs = require('fs-extra')
const net = require('net')
const chalk = require('chalk')
const { execSync } = require('child_process')

const PackageManager = require('./util/ProjectPackageManager')

const err = (msg) => console.log(`${chalk.red('[错误]')}${msg}`)
const success = (msg) => console.log(`${chalk.green('[成功]')}${msg}`)
const base = (msg) => console.log(`${chalk.cyanBright(msg)}`)
const warn = (msg) => console.log(`${chalk.yellow('[警告]')}${msg}`)
const change = (msg) => console.log(`${chalk.cyan('[变更]')}${msg}`)
const compile = (msg) => console.log(`${chalk.grey('[编译]')}${msg}`)

// 日志
exports.LOG = {
  err,
  success,
  base,
  warn,
  change,
  compile
}

/**
 * npm 管理
 *
 * pm.install()
 * pm.add('包名', isDev)
 * pm.remove('包名')
 */
exports.pm = new PackageManager({ context: process.cwd() })

// 打开 app
exports.openApp = (appname, path) => {
  const commander = `open -a /Applications/${appname}.app ${path || ''}`
  execSync(commander)
}

// 防止端口号被占用
exports.tryUsePort = (port, _portAvailableCallback) => {
  portInUse(port).then((port) => {
    _portAvailableCallback(port)
  }).catch(() => {
    console.log(port + ' 被占用')
    port += 1
    tryUsePort(port, _portAvailableCallback)
  })
}

// 获取当前分支
exports.getCurBranch = () => {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
}

exports.getCurBranchPromise = (context) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const { stdout } = await execa('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
      cwd: context || process.cwd()
    })
    resolve(stdout)
  })
}

exports.gitPull = async (context) => {
  const { stdout } = await execa('git', ['pull'], {
    cwd: context
  })
  return stdout
}

exports.gitDiff = async (context) => {
  const { stdout } = await execa('git', ['diff'], {
    cwd: context
  })
  return stdout
}

exports.gitPullOrigin = async (context, branch) => {
  const { stdout } = await execa('git', ['pull', 'origin', branch], {
    cwd: context
  })
  return stdout
}

exports.gitCheckout = async (context, branch) => {
  const { stdout } = await execa('git', ['checkout', branch], {
    cwd: context
  })
  return stdout
}

// 复制文本到剪切板
exports.copyToClipboard = (text) => {
  const context = path.join(__dirname, '..', 'clip.txt')
  fs.writeFileSync(context, text)
  execSync(`pbcopy < ${context}`)
  fs.removeSync(context)

  success('复制到剪切板')
}

// -----------------------utils----------------------------------
async function portInUse(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer().listen(port)
    server.on('listening', function () {
      server.close()
      resolve(port)
    })
    server.on('error', function (err) {
      if (err.code === 'EADDRINUSE') {
        port++
        reject(err)
      }
    })
  })
}
