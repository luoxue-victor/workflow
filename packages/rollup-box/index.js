const path = require('path')
const fs = require('fs')
const watch = require('./build/watch')
const build = require('./build/build')
const rootConfigPath = path.join(process.cwd(), 'rollup-box.config.js')
const boxConfig = fs.existsSync(rootConfigPath) ? require(rootConfigPath)() : {}

// 提供两种模式，watch 跟 rollup
exports.MODE = {
  WATCH: 'watch',
  BUILD: 'rollup'
}

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
exports.builder = async (mode, plugins) => {
  if (!mode) {
    throw new Throw('需要使用 watch｜rollup 模式')
  }

  const inputOptions = {
    input: path.join(process.cwd(), 'src', 'index.ts'),
    plugins,
    ...(boxConfig.input || {})
  }

  const outputOptions = {
    name: 'app',
    dir: 'dist',
    inlineDynamicImports: true,
    format: 'es',
    ...(boxConfig.output || {})
  }

  const rolluper = mode === 'watch' ? watch : build

  rolluper(inputOptions, outputOptions)
}
