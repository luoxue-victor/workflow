const { findSync } = require('../lib')
const Config = require('webpack-chain')
const config = new Config()
const files = findSync('../config')
const path = require('path')
const PluginAPI = require('../api/PluginAPI')
const resolve = (p) => {
  return path.join(process.cwd(), p)
}

const webpackVersion = require(resolve('node_modules/webpack/package.json')).version

module.exports = (options) => {
  const map = new Map()
  files.map(_ => {
    const name = path.basename(_, '.js')
    return map.set(name, require(_)({ config, webpackVersion, resolve, options, api: PluginAPI }))
  })

  map.forEach(v => v())

  return config
}
