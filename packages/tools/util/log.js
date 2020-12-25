const chalk = require('chalk')

const errLog = (msg) => console.log(`${chalk.red('[错误]')}${msg}`)
const successLog = (msg) => console.log(`${chalk.green('[成功]')}${msg}`)
const baseLog = (msg) => console.log(`${chalk.cyanBright(msg)}`)
const warnLog = (msg) => console.log(`${chalk.yellow('[警告]')}${msg}`)
const changeLog = (msg) => console.log(`${chalk.cyan('[变更]')}${msg}`)
const compileLog = (msg) => console.log(`${chalk.grey('[编译]')}${msg}`)
module.exports = {
  err: errLog,
  success: successLog,
  base: baseLog,
  warn: warnLog,
  change: changeLog,
  compile: compileLog
}
