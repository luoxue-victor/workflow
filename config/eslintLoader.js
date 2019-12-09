module.exports = ({ config, options, api }) => {
  const { lintOnSave = 'warning' } = options
  const extensions = ['js', 'jsx', 'vue']
  return () => {
    const path = require('path')
    const cwd = api.getCwd()
    const { resolveModule, loadModule } = require('@vue/cli-shared-utils')
    const allWarnings = lintOnSave === true || lintOnSave === 'warning'
    const allErrors = lintOnSave === 'error'

    const eslintPkg =
      loadModule('eslint/package.json', cwd, true) ||
      loadModule('eslint/package.json', __dirname, true)
    const { cacheIdentifier } = api.genCacheConfig(
      'eslint-loader',
      {
        'eslint-loader': require('eslint-loader/package.json').version,
        eslint: eslintPkg.version
      },
      [
        '.eslintrc.js',
        '.eslintrc.yaml',
        '.eslintrc.yml',
        '.eslintrc.json',
        '.eslintrc',
        'package.json'
      ]
    )
    config.module
      .rule('eslint')
      .pre()
      .exclude.add(/node_modules/)
      .end()
      .test(/\.(vue|(j)sx?)$/)
      .use('eslint-loader')
      .loader(require.resolve('eslint-loader'))
      .options({
        extensions,
        cache: true,
        cacheIdentifier,
        emitWarning: allWarnings,
        emitError: allErrors,
        eslintPath: path.dirname(
          resolveModule('eslint/package.json', cwd) ||
            resolveModule('eslint/package.json', __dirname)
        ),
        formatter: loadModule('eslint/lib/formatters/codeframe', cwd, true)
      })
  }
}
