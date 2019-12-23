const { done } = require('@pkb/shared-utils')

module.exports = function lint ({ args = {}, api, silent }) {
  const cwd = api.resolve('.')
  const fs = require('fs')
  const path = require('path')
  const globby = require('globby')
  const tslint = require('tslint')
  const ts = require('typescript')
  const vueCompiler = require('vue-template-compiler')
  const isVueFile = file => /\.vue(\.ts)?$/.test(file)

  const options = {
    fix: args.fix !== false,
    formatter: args.format || 'codeFrame',
    formattersDirectory: args['formatters-dir'],
    rulesDirectory: args['rules-dir']
  }

  const vueFileCache = new Map()
  const writeFileSync = fs.writeFileSync

  const patchWriteFile = () => {
    fs.writeFileSync = (file, content, options) => {
      if (isVueFile(file)) {
        const parts = vueFileCache.get(path.normalize(file))
        if (parts) {
          parts.content = content
          const { before, after } = parts
          content = `${before}\n${content.trim()}\n${after}`
        }
      }
      return writeFileSync(file, content, options)
    }
  }

  const restoreWriteFile = () => {
    fs.writeFileSync = writeFileSync
  }

  const parseTSFromVueFile = file => {
    if (vueFileCache.has(file)) {
      return vueFileCache.get(file)
    }

    const content = fs.readFileSync(file, 'utf-8')
    const { script } = vueCompiler.parseComponent(content, { pad: 'line' })
    if (script && /^tsx?$/.test(script.lang)) {
      vueFileCache.set(file, {
        before: content.slice(0, script.start),
        after: content.slice(script.end),
        content: script.content
      })
      return script
    }
  }

  const program = tslint.Linter.createProgram(api.resolve('tsconfig.json'))

  const patchProgram = program => {
    const getSourceFile = program.getSourceFile
    program.getSourceFile = function (file, languageVersion, onError) {
      if (isVueFile(file)) {
        const { content, lang = 'js' } = parseTSFromVueFile(file) || { content: '', lang: 'js' }
        const contentLang = ts.ScriptKind[lang.toUpperCase()]
        return ts.createSourceFile(file, content, languageVersion, true, contentLang)
      } else {
        return getSourceFile.call(this, file, languageVersion, onError)
      }
    }
  }

  patchProgram(program)

  const linter = new tslint.Linter(options, program)

  const updateProgram = linter.updateProgram
  linter.updateProgram = function (...args) {
    updateProgram.call(this, ...args)
    patchProgram(this.program)
  }

  const tslintConfigPath = tslint.Configuration.CONFIG_FILENAMES
    .map(filename => api.resolve(filename))
    .find(file => fs.existsSync(file))

  const config = tslint.Configuration.findConfiguration(tslintConfigPath).results
  const vueConfig = Object.assign(config)
  const rules = vueConfig.rules = new Map(vueConfig.rules)
  const rule = rules.get('no-consecutive-blank-lines')
  rules.set('no-consecutive-blank-lines', Object.assign({}, rule, {
    ruleSeverity: 'off'
  }))

  const lint = file => {
    const filePath = api.resolve(file)
    const isVue = isVueFile(file)
    patchWriteFile()
    linter.lint(
      filePath,
      '',
      isVue ? vueConfig : config
    )
    restoreWriteFile()
  }

  const files = args._ && args._.length
    ? args._
    : [cwd + '/src/**/*.ts', cwd + '/src/**/*.vue', cwd + '/src/**/*.tsx']

  if (config.linterOptions && config.linterOptions.exclude) {
    const rawTslintConfig = tslint.Configuration.readConfigurationFile(tslintConfigPath)
    const excludedGlobs = rawTslintConfig.linterOptions.exclude
    excludedGlobs.forEach((g) => files.push('!' + g))
  }

  return globby(files, { cwd }).then(files => {
    files.forEach(lint)
    if (silent) return
    const result = linter.getResult()
    if (result.output.trim()) {
      process.stdout.write(result.output)
    } else if (result.fixes.length) {
      const f = new tslint.Formatters.ProseFormatter()
      process.stdout.write(f.format(result.failures, result.fixes))
    } else if (!result.failures.length) {
      done('tslint 没有发现错误.\n')
    }

    if (result.failures.length && !args.force) {
      process.exitCode = 1
    }
  })
}
