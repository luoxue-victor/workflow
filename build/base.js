const fs = require('fs')
const Config = require('webpack-chain')
const config = new Config()
const path = require('path')
const PluginAPI = require('../api/PluginAPI')
const resolve = (p) => {
  return path.join(process.cwd(), p)
}

const webpackVersion = require(resolve('node_modules/webpack/package.json')).version

module.exports = (options) => {
  const configPath = path.join(__dirname, '..', 'config')
  const files = fs.readdirSync(configPath)
  const { getConfigsByName } = require('../util/getLocalConfigByPath')
  const configs = []
  files.forEach(fileName => configs.push(require(`${configPath}/${fileName}`)))
  configs.push(...getConfigsByName('packages', 'webpack-chain.config.js'))
  configs.forEach(c => c({
    config,
    webpackVersion,
    resolve,
    options,
    api: PluginAPI
  })())
  return config
}
