const {
  chalk,
  clearConsole
} = require('@pkb/shared-utils')

exports.generateTitle = async function (checkUpdate) {
  return chalk.bold.blue(checkUpdate)
}

exports.clearConsole = async function clearConsoleWithTitle(checkUpdate) {
  const title = await exports.generateTitle(checkUpdate)
  clearConsole(title)
}
