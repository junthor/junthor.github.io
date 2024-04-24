import { Editor } from "./classes/Editor.js";
import { available_fonts } from "./config/properties.js";
const editor = new Editor("editor-container");
let ffd = document.getElementById("font-family-dropdown");
if (ffd) {
    for (const ff of available_fonts) {
        ffd.innerHTML += `<div title="${ff}" style="font-family:${ff}, Lato, sans-serif" onclick="editor.insert('[t font=\\'${ff}\\']', '[/t]')">${ff}</div>`;
    }
}
// @ts-ignore
window.editor = editor;
