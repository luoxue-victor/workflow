const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// 注册命令，在 package.json contributes 中配置
	const disposable = vscode.commands.registerCommand('extension.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World from extension!');
	});

	context.subscriptions.push(disposable);
}

// 停用扩展时将调用此方法
function deactivate() {
	console.log('deactivate')
}

module.exports = {
	activate,
	deactivate
}
