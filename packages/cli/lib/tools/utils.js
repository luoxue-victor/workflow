/* eslint-disable no-async-promise-executor */
const exec = require('child_process').execSync
const execa = require('execa')
const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const execSync = require('child_process').execSync
const {
  success,
  LOG
} = require('./log')

exports.getCurBranch = () => {
  return exec('git rev-parse --abbrev-ref HEAD').toString().trim()
}

exports.getCurBranchPromise = (context) => {
  return new Promise(async(resolve) => {
    const {
      stdout
    } = await execa('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
      cwd: context || process.cwd()
    })
    resolve(stdout)
  })
}

exports.gitPull = async (context) => {
  const {
    stdout
  } = await execa('git', ['pull'], {
    cwd: context
  })
  return stdout
}

exports.gitDiff = async (context) => {
  const {
    stdout
  } = await execa('git', ['diff'], {
    cwd: context
  })
  return stdout
}

exports.gitPullOrigin = async (context, branch) => {
  const {
    stdout
  } = await execa('git', ['pull', 'origin', branch], {
    cwd: context
  })
  return stdout
}

exports.gitCheckout = async (context, branch) => {
  const {
    stdout
  } = await execa('git', ['checkout', branch], {
    cwd: context
  })
  return stdout
}

exports.gitLog = async (context, p, text) => {
  let {
    stdout
  } = await execa('git', ['log', '-S', text, '--', p], {
    cwd: context
  })

  const data = {}

  if (stdout) {
    stdout = stdout.split('\n')

    stdout.slice(0, 3).forEach(_ => {
      if (/^commit/.test(_)) {
        data.commitId = _.replace('commit', '').trim()
      }

      if (/^Author/.test(_)) {
        data.Author = _.replace('Author:', '').trim()
      }

      if (/^Date/.test(_)) {
        data.Date = _.replace('Date:', '').trim()
      }
    })
  }

  return data
}

exports.copyToClipboard = (text) => {
  const context = path.join(__dirname, '..', 'clip.txt')
  fs.writeFileSync(context, text)
  execSync(`pbcopy < ${context}`)
  fs.removeSync(context)

  success(' 已复制到剪切板')
}

exports.addTemplate = (p) => {
  const src = path.join(__dirname, '..', 'template', p)
  const dest = path.join(process.cwd(), p)
  fs.copySync(src, dest)
}

exports.addGitignore = (text) => {
  const gitignorePath = path.join(process.cwd(), '.gitignore')

  if (fs.existsSync(gitignorePath)) {
    const content = fs.readFileSync(gitignorePath).toString()

    if (!content.includes(text)) {
      fs.writeFileSync(gitignorePath, `${content} \n${text}`)
    }
  }
}

exports.delay = (wait) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, wait)
  })
}
