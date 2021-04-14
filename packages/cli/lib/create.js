const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const {
  chalk, error, stopSpinner, exit
} = require('@pkb/shared-utils')
const validateProjectName = require('validate-npm-package-name')
const Creator = require('./Creator')
const { clearConsole } = require('../util/clearConsole')

async function create(projectName, options) {
  const cwd = process.cwd()
  const name = projectName
  const targetDir = path.resolve(cwd, projectName || '.')

  const result = validateProjectName(name)
  if (!result.validForNewPackages) {
    console.error(chalk.red(`无效的项目名: "${name}"`))
    result.errors && result.errors.forEach((err) => {
      console.error(chalk.red.dim(`Error: ${err}`))
    })
    result.warnings && result.warnings.forEach((warn) => {
      console.error(chalk.red.dim(`Warning: ${warn}`))
    })
    exit(1)
  }

  // 如果文件夹存在
  if (fs.existsSync(targetDir)) {
    await clearConsole()

    const { action } = await inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: `目标文件夹 ${chalk.cyan(targetDir)} 已经存在. 选一种方式:`,
        choices: [
          { name: '删除重建', value: 'delete' },
          { name: '取消', value: 'cancel' }
        ]
      }
    ])
    if (action === 'cancel') {
      return
    } if (action === 'delete') {
      console.log(`\n正在删除中 ${chalk.cyan(targetDir)}...`)
      await fs.remove(targetDir)
    }
  }

  const creator = new Creator(name, targetDir)
  await creator.create(options)
}

module.exports = (...args) => create(...args).catch((err) => {
  stopSpinner(false)
  error(err)
  process.exit(1)
})
