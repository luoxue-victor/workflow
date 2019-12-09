const { findSync } = require('../lib')
const Config = require('webpack-chain')
const config = new Config()
const files = findSync('../config')
const path = require('path')
const PluginAPI = require('../cli/PluginAPI')
const resolve = (p) => {
  return path.join(process.cwd(), p)
}

module.exports = (options) => {
  const map = new Map()

  files.map(_ => {
    const name = path.basename(_, '.js')
    return map.set(name, require(_)({ config, resolve, options, api: PluginAPI }))
  })

  map.forEach(v => v())

  return config
}
