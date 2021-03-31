const fs = require('fs')
const path = require('path')

exports.getPromptModules = () => {
  const files = fs.readdirSync(path.join(__dirname, '..', 'promptModules'))
  return files.map(file => require(`../promptModules/${file}`))
}
