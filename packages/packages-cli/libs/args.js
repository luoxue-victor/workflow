const fs = require('fs')
const join = require('path').join
/**
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
  const result = []
  function finder(path) {
    const files = fs.readdirSync(path)
    files.forEach((val, index) => {
      const fPath = join(path, val)
      const stats = fs.statSync(fPath)
      if (stats.isDirectory()) finder(fPath)
      if (stats.isFile()) result.push(fPath)
    })
  }
  finder(join(__dirname, startPath))
  return result
}

function cleanArgs(cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

exports.findSync = findSync
exports.cleanArgs = cleanArgs
