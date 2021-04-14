const fs = require('fs')
const Config = require('webpack-chain')

const config = new Config()
const path = require('path')
const PluginAPI = require('../api/PluginAPI')

const resolve = (p) => path.join(process.cwd(), p)

const webpackVersion = require(resolve('node_modules/webpack/package.json')).version
module.exports = (options) => {
  const configPath = path.join(__dirname, '..', 'config')
  const files = fs.readdirSync(configPath)
  const { getAllPluginIdOfPackageJson } = require('@pkb/shared-utils')
  const configs = []
  files.forEach((fileName) => configs.push(require(`${configPath}/${fileName}`)))
  // 读取插件中的配置
  getAllPluginIdOfPackageJson().forEach((id) => {
    const pluginWebpackChainPath = `${id}/webpack-chain.config.js`
    try {
      const config = require(pluginWebpackChainPath)
      configs.push(config)
    } catch (error) {
      console.log(`没有 ${pluginWebpackChainPath}`)
    }
  })

  configs.forEach((c) => c({
    config,
    webpackVersion,
    resolve,
    options,
    api: PluginAPI
  })())

  return config
}
