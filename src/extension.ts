import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('sourceuribug.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from SourceUriBug!');
	});
	context.subscriptions.push(disposable);

	const exampleTreeNodeCmd = vscode.commands.registerCommand(
		'example.tree.node.command',
		exampleCommand
	);
	context.subscriptions.push(exampleTreeNodeCmd);

	const exampleEditorCmd = vscode.commands.registerCommand(
		'example.editor.command',
		exampleCommand
	);
	context.subscriptions.push(exampleEditorCmd);
}

export const exampleCommand = async (
	sourceUri: vscode.Uri
) => {
	/*
	  To reproduce, rename a file, only changing the case of some of the characters.
		(eg rename "INDEX.JS" to "index.js")
		NOTE: this bug only occurs when just the casing of the characters change.
		If characters are added or removed (eq "index.js" -> "index2.js") this bug does not occur.

		When this command is invoked via the explorer, sourceUri contains the updated filename.
		(eg sourceUri.fsPath is {path-to-file}/index.js)

		When this command is invoked via right-clicking in the editor, sourceUri contains the STALE filename
		and doesn't match what's in the file system.
		(eg sourceUri.fsPath is the old {path-to-file}/INDEX.JS", and not the current/expected {path-to-file}/index.js)
	*/

	debugger;
	console.log(sourceUri.fsPath);
	console.log(sourceUri.path);
}

// this method is called when your extension is deactivated
export function deactivate() {}
