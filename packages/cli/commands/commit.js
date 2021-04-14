const inquirer = require('inquirer')
const chalk = require('chalk')

exports.registerCommand = (params) => {
  const {
    program, cleanArgs, execSync, LOG
  } = params
  program
    .command('cm')
    .description('提交 commit')
    .action(async (cwd) => {
      commit(cleanArgs(cwd), execSync, LOG)
    })
}

async function commit(args, execSync, LOG) {
  const type = await getType()
  const desc = await getDesc(type, args)

  const cm = await getCommitMsg({ type, desc, args })

  commitCmd(cm.trim(), execSync, LOG)
}

async function commitCmd(cm, execSync, LOG) {
  const add = ' git add .'
  const commit = `git commit -m '${cm}'`
  execSync(add)
  console.log(add)
  execSync(commit)
  console.log(commit)
}

async function getCommitMsg(params) {
  const {
    type, desc, id, detail
  } = params
  const idStr = id ? `(fix #${id})` : ''
  const detailStr = detail ? `${detail}` : ''

  return `${type}: ${desc} ${idStr} ${detailStr}`
}

async function getDesc(type) {
  if (type === 'merge') {
    return '合并代码 解决冲突'
  }

  const input = [{
    type: 'input',
    message: '请输入一句话描述',
    name: 'msg',
    validate(val) {
      const max = 5
      if (!val) {
        return '此项为必填项'
      }
      if (val.length < max) {
        return `请输入一句话描述，需大于 ${chalk.yellow(max)} 个字`
      }
      return true
    }
  }]

  const res = await inquirer.prompt(input)

  return res.msg
}

async function getType() {
  const typeRes = await inquirer.prompt([{
    type: 'list',
    name: 'from',
    message: '请选择一种 type',
    choices: [
      {
        name: '1. feat: 新增feature',
        value: 'feat'
      },
      {
        name: '2. fix: 修复bug，可以是QA发现的BUG，也可以是研发自己发现的BUG',
        value: 'fix'
      },
      {
        name: '3. docs: 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等',
        value: 'docs'
      },
      {
        name: '4. style: 仅仅修改了空格、格式缩进、变量名等等，不改变代码逻辑',
        value: 'style'
      },
      {
        name: '5. refactor: 代码重构，没有加新功能或者修复bug',
        value: 'refactor'
      },
      {
        name: '6. perf: 优化相关，比如提升性能、体验',
        value: 'perf'
      },
      {
        name: '7. test: 测试用例，包括单元测试、集成测试等',
        value: 'test'
      },
      {
        name: '8. chore: 改变构建流程、或者增加依赖库、工具等',
        value: 'chore'
      },
      {
        name: '9. revert: 回滚到上一个版本',
        value: 'revert'
      },
      {
        name: '10. merge: 代码合并',
        value: 'merge'
      },
      {
        name: '11. sync: 同步主线或分支的Bug',
        value: 'sync'
      }
    ]
  }])
  return typeRes.from
}
