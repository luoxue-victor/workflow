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
    'one-var': 0,
    'no-return-await': 0,
    'no-prototype-builtins': 0,
    'prefer-promise-reject-errors': 0,
    'no-undef': 0,
    'no-unused-vars': 0,
    'no-sequences': 0
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
