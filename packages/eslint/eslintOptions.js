exports.config = () => {
  const config = {
    root: true,
    env: { node: true },
    extends: ['plugin:vue/essential'],
    rules: {
      'no-console': makeJSOnlyValue('process.env.NODE_ENV === \'production\' ? \'error\' : \'off\''),
      'no-debugger': makeJSOnlyValue('process.env.NODE_ENV === \'production\' ? \'error\' : \'off\'')
    }
  }
  config.parserOptions = {
    parser: 'babel-eslint'
  }
  return config
}

function makeJSOnlyValue(str) {
  const fn = () => {}
  fn.__expression = str
  return fn
}

const baseExtensions = ['.js', '.jsx', '.ts', '.tsx']
exports.extensions = () => baseExtensions
