const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('DevX File Icon extension is now active!');

    // Register a command to show information about the extension
    const disposable = vscode.commands.registerCommand('devx-file-icon.showInfo', () => {
        vscode.window.showInformationMessage('DevX File Icon: Custom icon for .devx files is active!');
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
