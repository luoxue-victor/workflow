const fs = require('fs')
const path = require('path')
const deepExtend = require('deep-extend')
const { build, createServer } = require('vite')
const { getConfig } = require('./util')
const config = getConfig()

// 数组扁平化
function flatten(arr) {
  return arr.reduce((result, item) => result.concat(Array.isArray(item) ? flatten(item) : item), [])
}

// 导出所有插件，可以自行选择使用哪些插件
exports.getPlugins = () => {
  const pluginsPath = path.join(__dirname, 'plugins')
  const pluginsName = fs.readdirSync(pluginsPath) || []
  const plugins = pluginsName.map((_) => require(path.join(pluginsPath, _))(config))

  return flatten(plugins)
}

exports.createServer = async (serverConfig) => {
  const server = await createServer(deepExtend(config, serverConfig))

  await server.listen()
}

exports.build = async function (buildConfig = {}) {
  await build(deepExtend(config, buildConfig))
}
