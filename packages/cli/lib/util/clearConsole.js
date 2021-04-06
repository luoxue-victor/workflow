const {
  chalk,
  clearConsole
} = require('@pkb/shared-utils')

exports.generateTitle = async function () {
  return chalk.bold.blue('pk-cli')
}

exports.clearConsole = async function clearConsoleWithTitle (checkUpdate) {
  const title = await exports.generateTitle(checkUpdate)
  clearConsole(title)
}
