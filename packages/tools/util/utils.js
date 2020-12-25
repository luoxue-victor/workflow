const execa = require('execa')
const path = require('path')
const fs = require('fs-extra')
const execSync = require('child_process').execSync
const { success } = require('../util/log')

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
