const path = require('path')
const fs = require('fs')

module.exports.getConfigsByName = function (dir, confName) {
  const pkgsLocalDirPath = path.join(__dirname, '..', dir)
  const dirNames = fs.readdirSync(pkgsLocalDirPath)
  const configs = []
  dirNames.forEach((name) => {
    const filePath = path.join(__dirname, '..', dir, name)
    const isDir = fs.statSync(filePath).isDirectory()
    const confPath = path.join(filePath, confName)
    if (isDir && fs.existsSync(confPath)) {
      configs.push(require(confPath))
    }
  })
  return configs
}
