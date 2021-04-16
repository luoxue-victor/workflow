const path = require('path')
const fs = require('fs')
const rootConfigPath = path.join(process.cwd(), 'vite-box.config.js')
const boxConfig = fs.existsSync(rootConfigPath) ? require(rootConfigPath)() : {}

// 数组扁平化
function flatten(arr) {
  return arr.reduce((result, item) => result.concat(Array.isArray(item) ? flatten(item) : item), [])
}

// 导出所有插件，可以自行选择使用哪些插件
exports.getPlugins = () => {
  const pluginsPath = path.join(__dirname, 'plugins')
  const pluginsName = fs.readdirSync(pluginsPath) || []
  const plugins = pluginsName.map((_) => require(path.join(pluginsPath, _))(boxConfig))

  return flatten(plugins)
}

// 构建项目
exports.createServer = async (plugins) => {
  const { createServer } = require('vite')
  const server = await createServer({
    configFile: false,
    root: __dirname,
    server: {
      port: 7777
    },
    plugins
  })

  await server.listen()
}
