const micromatch = require('micromatch')
const fs = require('fs')

function getDirectoryEntries(directory) {
  try {
    return fs.readdirSync(directory)
  } catch (e) {
    return []
  }
}

exports.hasStylelintConfig = function hasESLintConfig(directory) {
  return micromatch.some(
    getDirectoryEntries(directory),
    ['stylelint.config.js', '.stylelintrc', '.stylelintrc.{js,json,yaml,yml}'],
    { dot: true }
  )
}
