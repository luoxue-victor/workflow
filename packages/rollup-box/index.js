const path = require('path')
const watch = require('./build/watch')
const build = require('./build/build')
const fs = require('fs')

const isDevEnv = process.env.NODE_ENV === 'development'

// 提供两种模式，watch 跟 rollup
exports.MODE = {
  WATCH: 'watch',
  BUILD: 'rollup'
}

// 数组扁平化
function flatten(arr) {
  return arr.reduce((result, item) => {
    return result.concat(Array.isArray(item) ? flatten(item) : item)
  }, [])
}

// 导出所有插件，可以自行选择使用哪些插件
exports.getPlugins = (config) => {
  const pluginsPath = path.join(__dirname, 'plugins')
  const pluginsName = fs.readdirSync(pluginsPath) || []

  const plugins = pluginsName.map(_ => {
    return require(path.join(pluginsPath, _))(config)
  })

  return flatten(plugins)
}

// 构建项目
exports.builder = async (mode, plugins, config = {}) => {
  if (!mode) {
    throw new Throw('需要使用 watch｜rollup 模式')
  }

  const inputOptions = Object.assign({
    input: path.join(process.cwd(), 'src', 'index.ts'),
    plugins
  }, config.input || {})

  const outputOptions = Object.assign({
    name: 'app',
    dir: 'dist',
    inlineDynamicImports: true,
    format: 'es'
  }, config.output || {})

  const rolluper = mode === 'watch' ? watch : build

  rolluper(inputOptions, outputOptions)
}
