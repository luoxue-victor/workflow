module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  rules: {
    'no-new': 0,
    'max-len': 0,
    'space-before-function-paren': 0,
    'eslint-disable-next-line': 0,
    'no-useless-escape': 0,
    'one-var': 0
  },
  globals: {
    wx: true,
    window: true,
    document: true,
    MY_ENV: true,
    $: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
