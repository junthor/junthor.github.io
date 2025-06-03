import { DraggableWindow } from "./DraggableWindow.js";
import { SNIPPETS } from '../../config/properties.js';
export class SnippetsWindow {
    constructor(editor, stylist) {
        this.stylist = stylist;
        this.editor = editor;
        // Link with the editor button
        const icon = '<i class="fa-solid fa-wand-magic-sparkles"></i>';
        const name = 'Snippets';
        const id = 'snippets-app';
        this.window = new DraggableWindow(id, `${icon} ${name}`);
        let button = document.getElementById(`${id}-button`);
        if (button) {
            button.innerHTML = icon;
            button.title = name;
            button.addEventListener('click', () => this.window.toggle_window());
        }
        // ---------------------------
        this.preview_block = document.createElement('div');
        this.preview_block.className = 'block-preview';
        this.preview_page = document.createElement('div');
        this.preview_page.className = 'page-preview';
        this.mini_page = document.createElement('div');
        this.mini_page.className = 'mini-page';
        this.preview_page.appendChild(this.mini_page);
        this.categories = this.create_snippets();
        this.column = this.window.create_column(this.categories);
        this.window.get_container().appendChild(this.preview_page);
        this.window.get_container().appendChild(this.preview_block);
        let first_button = this.column.children[0];
        first_button.click();
        document.body.appendChild(this.window.get_window());
    }
    create_snippets() {
        let categories = {};
        let cpt_id = 0;
        for (const category in SNIPPETS) {
            const content = this.window.create_content();
            // Add to the categories
            categories[category] = content;
            for (let block of SNIPPETS[category]) {
                let container = document.createElement('div');
                let section = this.window.create_section(block.title);
                content.appendChild(section);
                container.className = block.container;
                container.style.columns = "2";
                container.style.padding = "8px";
                for (let item of block.content) {
                    let item_elt = document.createElement('div');
                    item_elt.className = 'item';
                    item_elt.innerHTML = typeof item[0] === 'string' ? item[0] : item[0][0];
                    item_elt.item = item;
                    item_elt.snippet = this;
                    if (item.length > 3)
                        item_elt.addEventListener('click', this.snippet_button_value);
                    else
                        item_elt.addEventListener('click', this.snippet_button_insert);
                    item_elt.addEventListener('mouseenter', this.snippet_button_hover);
                    container.appendChild(item_elt);
                }
                if (block.container == "spoiler")
                    this.window.create_spoiler(section, container);
                content.appendChild(container);
            }
            cpt_id++;
        }
        return categories;
    }
    snippet_button_value() {
        let snippet = this.snippet;
        let item = this.item;
        if (typeof item[3] !== 'string')
            return;
        if (item[3] == '--page-background-image') {
            let page_background, page_background2;
            if (Array.isArray(item[4])) {
                page_background = item[4][0];
                page_background2 = item[4][1];
            }
            else {
                page_background = item[4];
                page_background2 = item[4];
            }
            snippet.stylist.set_root_value('--page-background-image', page_background, 'root_value');
            snippet.stylist.set_root_value('--page-background-image2', page_background2, 'root_value');
        }
        else if (typeof item[4] === 'string') {
            snippet.stylist.set_root_value(item[3], item[4], 'root_value');
        }
    }
    snippet_button_insert() {
        if (typeof this.item[1] === 'string')
            this.snippet.editor.insert(this.item[1]);
    }
    snippet_button_hover() {
        let snippet = this.snippet;
        let item = this.item;
        let content = item[1];
        if (Array.isArray(content)) {
            if (content.length > 0)
                content = item[1][0];
            else
                return;
        }
        if (item[2] == 'block') {
            snippet.preview_block.innerHTML = snippet.editor.simple_parse(content);
            snippet.preview_page.style.display = "none";
            snippet.preview_block.style.display = "block";
        }
        else {
            snippet.mini_page.innerHTML = snippet.editor.simple_parse(content);
            snippet.preview_block.style.display = "none";
            snippet.preview_page.style.display = "flex";
        }
    }
    update_layout() {
        let column_count = document.getElementById('--column-count');
        let c = this.stylist.get_root_value('--column-count');
        if (!c)
            c = '2';
        if (column_count)
            column_count.value = c;
        for (let align of ['Top', 'Bottom', 'Left', 'Right']) {
            let key = `--page-margin-${align.toLowerCase()}`;
            let margin = document.getElementById(key);
            let value = this.stylist.get_root_value(key);
            if (!margin || !value)
                continue;
            margin.value = value;
        }
    }
}
