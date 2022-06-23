"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.exampleCommand = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    let disposable = vscode.commands.registerCommand('sourceuribug.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from SourceUriBug!');
    });
    context.subscriptions.push(disposable);
    const exampleTreeNodeCmd = vscode.commands.registerCommand('example.tree.node.command', exports.exampleCommand);
    context.subscriptions.push(exampleTreeNodeCmd);
    const exampleEditorCmd = vscode.commands.registerCommand('example.editor.command', exports.exampleCommand);
    context.subscriptions.push(exampleEditorCmd);
}
exports.activate = activate;
const exampleCommand = async (sourceUri) => {
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
    /*
        We can get the actual file name from
        vscode.window.tabGroups.activeTabGroup.activeTab.label
        and then replace the filename we get from sourceUri.path with the
        filename from the activeTab's label but...
            A) this seems very hacky
            B) this seems fragile and likely to break in the future
            C) This would work for the case where the file is opened and the "Example Editor Command" is executed,
                but won't work for the explorer command, and will need to have some conditional logic to handle the
                two scenarios.
    */
};
exports.exampleCommand = exampleCommand;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map