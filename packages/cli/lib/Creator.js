const inquirer = require('inquirer')
const EventEmitter = require('events')
const PackageManager = require('../util/ProjectPackageManager')
const { clearConsole } = require('../util/clearConsole')
const path = require('path')
const fs = require('fs-extra')
const copydir = require('copy-dir')
const ncu = require('npm-check-updates')

const {
  chalk,
  execa,
  log,
  warn,
  logWithSpinner,
  stopSpinner,
  hasGit,
  hasYarn,
  hasPnpm3OrLater
} = require('@pkb/shared-utils')

module.exports = class Creator extends EventEmitter {
  constructor (name, context) {
    super()

    this.name = name
    this.context = context
    this.afterInvokeCbs = []
    this.afterAnyInvokeCbs = []
  }

  async create (cliOptions = {}) {
    const { run, name, context } = this

    const packageManager = (
      (hasYarn() ? 'yarn' : null) ||
      (hasPnpm3OrLater() ? 'pnpm' : 'npm')
    )

    const pm = new PackageManager({ context, forcePackageManager: packageManager })
    const projectType = await this.choiceProject()
    const templatePath = path.join(__dirname, '..', 'template', projectType)
    const baseTemplatePath = path.join(__dirname, '..', 'template', 'base')
    const targetPath = path.join(process.cwd(), name)

    await clearConsole('创建项目')
    logWithSpinner('✨', `创建项目 ${chalk.yellow(context)}.`)

    fs.mkdirSync(name)

    ;[baseTemplatePath, templatePath].forEach(_ => {
      copydir.sync(_, targetPath, {
        utimes: true,
        mode: true,
        cover: true
      })
    })

    await fs.rename(path.join(targetPath, '_vscode'), path.join(targetPath, '.vscode'))

    logWithSpinner('✨', '更新 package.json')
    await ncu.run({
      jsonUpgraded: true,
      filter: '@pkb/*',
      upgrade: true,
      silent: true,
      cwd: context
    })
    stopSpinner()

    const shouldInitGit = this.shouldInitGit(cliOptions)
    if (shouldInitGit) {
      logWithSpinner('🗃', '正在初始化 git ...')

      await run('git init')
    }

    stopSpinner()

    log('📦  安装依赖中...')
    await pm.install()

    stopSpinner()

    let gitCommitFailed = false
    if (shouldInitGit) {
      await run('git add -A')
      try {
        await run('git', ['commit', '-m', 'init'])
      } catch (e) {
        gitCommitFailed = true
      }
    }

    stopSpinner()
    log()
    log(`🎉  成功创建项目 ${chalk.yellow(name)}.`)
    log(`🎉  ${chalk.yellow(`cd ${name}`)}.`)
    log()

    if (gitCommitFailed) {
      warn(
        '由于git配置中缺少用户名和电子邮件，所以跳过了git提交.\n' +
        '您需要自己执行初始提交.\n'
      )
    }
  }

  run = (command, args) => {
    if (!args) { [command, ...args] = command.split(/\s+/) }
    return execa(command, args, { cwd: this.context })
  }

  shouldInitGit () {
    if (!hasGit()) {
      return false
    }
    return true
  }

  choiceProject = async () => {
    const prompt = {
      name: 'type',
      type: 'list',
      message: '您要创建的项目是哪种类型:',
      choices: [
        {
          name: 'webpack',
          value: 'webpack',
          message: '大型框架[使用 webpack 打包]'
        },
        {
          name: 'rollup',
          value: 'rollup',
          message: '小型库[使用 rollup 打包]'
        },
        {
          name: 'vite',
          value: 'vite',
          message: '快速编译[使用 vite 打包]'
        },
        {
          name: 'node',
          value: 'node',
          message: '轻量级的 node 应用'
        },
        {
          name: 'lerna',
          value: 'lerna',
          message: '多包存储库管理工具'
        },
        {
          name: 'vscode 插件',
          value: 'vscode',
          message: 'vscode 插件'
        }
      ]
    }

    const answers = await inquirer.prompt(prompt)

    return answers.type
  }
}