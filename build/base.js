const { findSync } = require('../lib')
const Config = require('webpack-chain');
const config = new Config();
const files = findSync('../config')
const path = require('path');
const resolve = (p) => {
  return path.join(process.cwd(), p)
}

module.exports = (options) => {
  const map = new Map()

  files.map(_ => {
    const name = _.split('/').pop().replace('.js', '')
    return map.set(name, require(_)({config, resolve, options}))
  })

  map.forEach(v => v());
  
  return config
}