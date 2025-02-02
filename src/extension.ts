// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import Website from './website';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "site-to-markdown" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('site-to-markdown.download', async () => {
		// The code you place here will be executed every time your command is executed

		const url = await vscode.window.showInputBox({
			placeHolder: "https://example.com",
			validateInput: text => {
			  return text.match(/https?:\/\//) ? null : 'Not a URL';
		  }});

		// Display a message box to the user
		vscode.window.showInformationMessage(`Downloading ${url}`);

		if (!url){
			return;
		}
		let website = new Website(url);
		try {
			let websiteContent = await website.download();
			vscode.workspace.openTextDocument({
				language: 'markdown',
				content: websiteContent.toString()
			});
		}
		catch(exc) {
			vscode.window.showErrorMessage(exc.message);
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
