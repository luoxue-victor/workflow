const globby = require('globby')

const renamedArrayArgs = {
  ext: 'extensions',
  env: 'envs',
  global: 'globals',
  rulesdir: 'rulePaths',
  plugin: 'plugins',
  'ignore-pattern': 'ignorePattern'
}

const renamedArgs = {
  'inline-config': 'allowInlineConfig',
  rule: 'rules',
  eslintrc: 'useEslintrc',
  c: 'configFile',
  config: 'configFile'
}

module.exports = function lint({ args = {} } = {}) {
  const path = require('path')
  const cwd = process.cwd()
  const {
    log, done, exit, chalk, loadModule
  } = require('@pkb/shared-utils')
  const { CLIEngine } = loadModule('eslint', cwd, true) || require('eslint')
  const extensions = require('./eslintOptions').extensions()
  const argsConfig = normalizeConfig(args)
  const config = {
    extensions,
    fix: true,
    cwd,
    ...argsConfig
  }

  const noFixWarnings = (argsConfig.fixWarnings === false)
  const noFixWarningsPredicate = (lintResult) => lintResult.severity === 2
  config.fix = config.fix && (noFixWarnings ? noFixWarningsPredicate : true)

  config.ignorePattern = [
    '!.*.js',
    '*/**/node_modules',
    '!{src,tests}/**/.*.js'
  ]

  const engine = new CLIEngine(config)

  const defaultFilesToLint = [
    'src',
    'config',
    'cwd',
    'lib',
    'packages',
    'server',
    'tests',
    'util',
    '*.js',
    '.*.js'
  ]
    .filter((pattern) => globby
      .sync(pattern, { cwd, absolute: true })
      .some((p) => !engine.isPathIgnored(p)))

  const files = args._ && args._.length
    ? args._
    : defaultFilesToLint

  const processCwd = process.cwd

  const report = engine.executeOnFiles(files)
  process.cwd = processCwd

  const formatter = engine.getFormatter(args.format || 'codeframe')
  if (config.fix) {
    CLIEngine.outputFixes(report)
  }

  const maxErrors = argsConfig.maxErrors || 0
  const maxWarnings = typeof argsConfig.maxWarnings === 'number' ? argsConfig.maxWarnings : Infinity
  const isErrorsExceeded = report.errorCount > maxErrors
  const isWarningsExceeded = report.warningCount > maxWarnings

  if (!isErrorsExceeded && !isWarningsExceeded) {
    if (!args.silent) {
      const hasFixed = report.results.some((f) => f.output)
      if (hasFixed) {
        log('Eslint 正在帮您修复以下文件...')
        log()
        report.results.forEach((f) => {
          if (f.output) {
            log(`  ${chalk.blue(path.relative(cwd, f.filePath))}`)
          }
        })
        log()
      }
      if (report.warningCount || report.errorCount) {
        console.log(formatter(report.results))
      } else {
        done(hasFixed ? '所有错误被自动修复' : 'eslint 没有发现错误!')
      }
    }
  } else {
    console.log(formatter(report.results))
    if (isErrorsExceeded && typeof argsConfig.maxErrors === 'number') {
      log(`Eslint 发现太多错误 (maximum: ${argsConfig.maxErrors}).`)
    }
    if (isWarningsExceeded) {
      log(`Eslint 发现太多错误 (maximum: ${argsConfig.maxWarnings}).`)
    }
    exit(1)
  }
}

function normalizeConfig(args) {
  const config = {}
  for (const key in args) {
    if (key === 'env') {
      continue
    }
    if (renamedArrayArgs[key]) {
      config[renamedArrayArgs[key]] = args[key].split(',')
    } else if (renamedArgs[key]) {
      config[renamedArgs[key]] = args[key]
    } else if (key !== '_') {
      config[camelize(key)] = args[key]
    }
  }
  return config
}

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}
