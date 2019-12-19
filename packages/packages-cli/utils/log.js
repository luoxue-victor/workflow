const chalk = require('chalk')
const ForegroundColor = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
  'grey',
  'blackBright',
  'redBright',
  'greenBright',
  'yellowBright',
  'blueBright',
  'magentaBright',
  'cyanBright',
  'whiteBright'
]

const BackgroundColor = [
  'bgBlack',
  'bgRed',
  'bgGreen',
  'bgYellow',
  'bgBlue',
  'bgMagenta',
  'bgCyan',
  'bgWhite',
  'bgGray',
  'bgGrey',
  'bgBlackBright',
  'bgRedBright',
  'bgGreenBright',
  'bgYellowBright',
  'bgBlueBright',
  'bgMagentaBright',
  'bgCyanBright',
  'bgWhiteBright'
]

const allColor = [...ForegroundColor, ...BackgroundColor]
const RAW_LOG = console.log
const colorTypeErr = () => (RAW_LOG(chalk.red('颜色名称错误：您可以在下面颜色中选一个～\n')), RAW_LOG(allColor.join(',')))

const logType = {
  err: {
    action(msg) {
      COLOR_LOG('red', '错误：' + msg)
    }
  },
  warn: {
    action(msg) {
      COLOR_LOG('yellow', '警告：' + msg)
    }
  }
}

/**
 * @method COLOR_LOG
 * @param {String} name 颜色名称
 * @param {String} arguments[1,,,] 打印信息
 */
function COLOR_LOG(name = 'cyan') {
  if (!allColor.includes(arguments[0])) return colorTypeErr()
  const args = [...arguments]
  const colorArgs = args.map(_ => chalk[name](_))
  colorArgs.splice(0, 1)
  RAW_LOG(...colorArgs)
}

/**
 * @method LOG 打印带有类型的日志
 * @param {String} type 日志类型
 * @param {String} msg  日志信息
 */
const LOG = (type, msg) => logType[type].action(msg)

exports.LOG = LOG
exports.COLOR_LOG = COLOR_LOG
