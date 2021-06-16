const fs = require('fs')
const path = require('path')
const vscode = require('vscode');

const extensionsDirPath = path.join(__dirname, 'extensions')
const extensionsDir = fs.readdirSync(extensionsDirPath)

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    extensionsDir.forEach(filename => {
      const { activate } = require(path.join(extensionsDirPath, filename))
      activate && activate(context)
    });
}

function deactivate() {
  extensionsDir.forEach(filename => {
    const { deactivate } = require(path.join(extensionsDirPath, filename))
    deactivate && deactivate()
  });
}

module.exports = {
	activate,
	deactivate
}