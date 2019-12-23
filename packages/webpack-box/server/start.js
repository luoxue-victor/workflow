require('@babel/register')({
  plugins: ['@babel/plugin-syntax-dynamic-import'],
  presets: ['@babel/preset-env'],
  extensions: ['.es6', '.es', '.jsx', '.js', '.mjs']
})

require('babel-polyfill')
require('./server')
