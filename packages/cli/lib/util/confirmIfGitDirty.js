const inquirer = require('inquirer')
const {
  execa,
  warn,
  hasProjectGit
} = require('@pkb/shared-utils')

module.exports = async function confirmIfGitDirty (context) {
  if (process.env.VUE_CLI_SKIP_DIRTY_GIT_PROMPT || process.env.VUE_CLI_API_MODE) {
    return true
  }

  process.env.VUE_CLI_SKIP_DIRTY_GIT_PROMPT = true

  if (!hasProjectGit(context)) {
    return true
  }

  const { stdout } = await execa('git', ['status', '--porcelain'], { cwd: context })
  if (!stdout) {
    return true
  }

  warn('当前存储库中有未提交的更改，建议先 commit 或者 stash。')
  const { ok } = await inquirer.prompt([
    {
      name: 'ok',
      type: 'confirm',
      message: 'Still proceed?',
      default: true
    }
  ])
  return ok
}
