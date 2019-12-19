module.exports.getAllCwds = function() {
  const path = require('path')
  const fs = require('fs')
  const localCwdPath = path.join(__dirname, '..', 'cwd')
  const localCwdNames = [...fs.readdirSync(localCwdPath)]
  const cwdFns = []
  const { getConfigsByName } = require('../util/getLocalConfigByPath')
  localCwdNames.forEach(name => {
    const cwdPath = path.join(localCwdPath, name)
    cwdFns.push(require(cwdPath))
  })
  cwdFns.push(...getConfigsByName('packages', 'cwd.config.js'))
  return cwdFns
}
