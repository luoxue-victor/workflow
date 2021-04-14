const { execSync } = require('child_process')
const chalk = require('chalk')
const stylelint = require('stylelint')
const CodeframeFormatter = require('stylelint-codeframe-formatter')

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (
    c
      ? c.toUpperCase()
      : ''
  ))
}

function normalizeConfig(args) {
  const config = {}
  Object.keys(args).forEach((key) => {
    if (key !== '_') {
      config[camelize(key)] = args[key]
    }
  })
  return config
}

function format(label, msg) {
  let lines = msg.split('\n')
  lines = lines.map((line, idx) => (
    idx === 0
      ? `${label} ${line}`
      : line.padStart(chalk.reset(label).length)
  ))

  return lines.join('\n')
}

module.exports = async function lint({ args = {}, pluginOptions = {} } = {}) {
  if (args.options) {
    execSync('stylelint --help', { stdio: 'inherit' })
    return
  }

  const cwd = process.cwd()

  const files = args._ && args._.length ? args._ : [`${cwd}/src/**/*.{vue,htm,html,css,sss,less,scss}`]
  if (args['no-fix']) {
    args.fix = false
    delete args['no-fix']
  }

  const { formatter } = args
  if (
    formatter &&
    typeof formatter === 'string' &&
    !(['json', 'string', 'verbose'].includes(formatter))
  ) {
    try {
      args.formatter = require(formatter)
    } catch (e) {
      delete args.formatter
      if (typeof pluginOptions.formatter !== 'function') {
        console.log(format(
          chalk`{bgYellow.black  WARN }`,
          chalk`${e.toString()}\n{黄色的无效的格式化程序}`
        ))
      }
    }
  }

  const options = {
    configBasedir: cwd,
    fix: true,
    files,
    formatter: CodeframeFormatter,
    ...pluginOptions,
    ...normalizeConfig(args)
  }

  try {
    const { errored, results, output: formattedOutput } = await stylelint.lint(options)
    if (!errored) {
      if (!args.silent) {
        const hasWarnings = results.some((result) => {
          if (result.ignored) {
            return null
          }
          return result.warnings.some((warning) => warning.severity === 'warning')
        })
        if (hasWarnings) {
          console.log(formattedOutput)
        } else {
          console.log(format(
            chalk`{bgGreen.black  DONE }`,
            `stylelint 没有发现错误!${options.fix ? chalk` {blue (已经自动修复)}` : ''}`
          ))
        }
      }
    } else {
      console.log(formattedOutput)
      process.exit(1)
    }
  } catch (err) {
    console.log(format(
      chalk`{bgRed.black  ERROR }`,
      err.stack.slice(' Error:'.length)
    ))
    process.exit(1)
  }
}
