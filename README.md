# SourceUriBug README

This is a POC project to demonstrate the issue with file renaming in VS Code - namely 1) After a file has been renamed by a user, the VS Code APIs return the stale name, and 2) the sourceUri passed when invoked via the explorer is different from the sourceUri that's passed when invoked via a contextual menu in a document.

This is a boilerplate VS Code extension, with the following events added:
* example.tree.node.command
* example.editor.command

Both of these commands call `exampleCommand()` in `extension.ts`.


#
To reproduce the bug:
1. Run VS Code with this extension
2. Open a project
3. In the explorer, right-click on a file and select `Rename`.
4. Rename the file's name.  Only change the case of some of the characters, don't add or remove characters.  (eg. rename `homepage.html` to `homePage.html`)
5. In the explorer, right-click on the same file and select `Example Tree Node Command`

Result:
When debugging, you should break into `exampleCommand()`.  Observe the sourceUri that's passed in, and notice that the paths in sourceUri are to `homePage.html`, which is expected.

6. If not already opened, open the file that was renamed (eq `homePage.html`)
7. Right-click in the editor and select `Example Editor Command`

Result:
When debugging, you should break into `exampleCommand()`.  Observe the sourceUri that's passed in, and notice that the paths in sourceUri are incorrect, and are the stale/original `homepage.html`.

#
There are two bugs here:
1) After a file has been renamed by a user, the VS Code APIs return the stale name
2) The sourceUri passed when invoked via the explorer is a different from the sourceUri that's passed when invoked via a contextual menu in a document.
