const { findSync } = require('../lib')
const Config = require('webpack-chain');
const config = new Config();
const files = findSync('config')
const path = require('path');
const resolve = (p) => {
  return path.join(process.cwd(), p)
}

module.exports = () => {
  const map = new Map()

  files.map(_ => {
    const name = _.split('/').pop().replace('.js', '')
    return map.set(name, require(_)(config, resolve))
  })

  map.forEach((v, key) => {
    // css 配置
    if (key === 'css') {
      v('css', /\.css$/);
    } else {
      v()
    }
  })
  
  return config
}