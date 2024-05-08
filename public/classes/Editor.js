import { DocumentSaver } from "./DocumentSaver.js";
import { PageManager } from "./PageManager.js";
import { EditorParser } from "./EditorParser.js";
import { Stylist } from "./Stylist.js";
import { Guide } from '../config/guide.js';
import { format, set_columnbreak, MOUSE_POS, print_document, isWebkit } from "../Utils.js";
export class Editor {
    constructor(container_id) {
        this.page_zoom = 0;
        this.pages = [];
        let separator = document.createElement("div");
        let container = document.getElementById(container_id);
        if (container == null) {
            container = document.createElement('div');
            container.id = container_id;
        }
        this.container = container;
        this.separator = separator;
        this.editor = document.createElement("pre");
        this.content = document.createElement("div");
        let content_container = document.createElement("div");
        this.editor.className = "bbcode-editor";
        this.editor.id = "bbcode-editor";
        this.separator.addEventListener("mousedown", resize);
        this.separator.className = "splitter";
        let goto_page = document.createElement('div');
        goto_page.className = 'goto-page';
        goto_page.title = "Find page at cursor";
        goto_page.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
        goto_page.addEventListener("mousedown", e => {
            e.preventDefault();
            e.stopImmediatePropagation();
            this.goto_page();
        });
        this.separator.appendChild(goto_page);
        this.separator.style.position = 'relative';
        let big_container = document.createElement("div");
        big_container.className = "bbcode-content-container";
        this.right_panel = big_container;
        big_container.appendChild(this.create_topbar());
        big_container.appendChild(content_container);
        content_container.className = "bbcode-content";
        this.content.id = "page-container";
        this.container.appendChild(this.editor);
        this.container.appendChild(this.separator);
        content_container.appendChild(this.content);
        this.container.appendChild(big_container);
        this.page_manager = new PageManager();
        this.parser = new EditorParser();
        this.stylist = new Stylist(this);
        this.stylist.hot_load();
        this.separator.editor = this;
        this.container.editor = this;
        this.create_page();
        // Ace is imported as js at index
        // @ts-ignore
        let ace_editor = ace.edit("bbcode-editor");
        ace_editor.setTheme("ace/theme/monokai");
        ace_editor.session.setMode("ace/mode/markdown");
        this.text_editor = ace_editor.session;
        ace_editor.className += "bbcode-editor";
        ace_editor.setOptions({
            wrapBehavioursEnabled: true,
            wrap: true,
            wrapMethod: "auto",
            autoScrollEditorIntoView: true,
        });
        ace_editor.session.addEventListener("change", (e) => this.on_input(e));
        // @ts-ignore
        this.css_editor = ace.createEditSession('/* CSS */');
        this.css_editor.addEventListener("change", (e) => this.on_input_css(e));
        this.css_editor.setMode('ace/mode/css');
        this.editor = ace_editor;
        this.editor.setShowPrintMargin(false);
        this.file_manager = new DocumentSaver(this, this.stylist);
        this.insert(`### Welcome
If this is your first time using the editor, don't to hesitate to check 
the guide by clicking on the guide button on the right side of the preview's bar!`);
    }
    save() {
        this.file_manager.save();
    }
    load(input) {
        let file = input.files;
        if (file)
            this.file_manager.load(file[0]);
    }
    session_buttons(active) {
        let txt_button = document.getElementById('text-editor-button');
        let css_button = document.getElementById('css-editor-button');
        if (!txt_button || !css_button)
            return;
        if (active == 'text') {
            txt_button.className = 'disabled';
            css_button.className = 'big-button';
        }
        else if (active == 'css') {
            css_button.className = 'disabled';
            txt_button.className = 'big-button';
        }
    }
    set_text_session() {
        this.editor.setSession(this.text_editor);
        this.session_buttons('text');
    }
    set_css_session() {
        this.editor.setSession(this.css_editor);
        this.session_buttons('css');
    }
    undo() { this.stylist.undo(); }
    redo() { this.stylist.redo(); }
    on_input_css(e) {
        this.stylist.set_custom_css(this.get_css());
    }
    on_input(e) {
        // Number of characters in the delta
        let length = e.lines.length - 1;
        for (const element of e.lines)
            length += element.length;
        let text = this.get_text();
        let start = this.editor.session.doc.positionToIndex(e.start);
        let data;
        if (e.action == "remove") {
            data = this.page_manager.on_remove(text, start, start + length);
        }
        else {
            data = this.page_manager.on_insert(text, start, start + length);
        }
        this.parse(data);
    }
    create_topbar() {
        let buttonbar = document.createElement("div");
        buttonbar.className = "bbcode-content-buttons";
        let save_button = document.createElement("button");
        save_button.className = "big-button save-button";
        save_button.title = "Save file";
        save_button.innerHTML = '<i class="bi bi-floppy2-fill"></i> Save';
        save_button.addEventListener("click", (e) => this.save());
        let load_input = document.createElement("input");
        load_input.type = "file";
        load_input.accept = ".curator";
        load_input.id = "load-input";
        load_input.addEventListener("change", (e) => this.load(load_input));
        let load_button = document.createElement("label");
        load_button.setAttribute('for', 'load-input');
        load_button.className = "big-button load-button";
        load_button.title = "Open file";
        load_button.innerHTML = '<i class="bi bi-folder-symlink-fill"></i> Open';
        let paper_format = document.createElement("select");
        paper_format.id = "format-selector";
        paper_format.innerHTML = '<option value="A4">A4</option>';
        paper_format.innerHTML += '<option value="A5">A5</option>';
        paper_format.innerHTML += '<option value="Letter">Letter</option>';
        paper_format.addEventListener('change', e => this.stylist.set_page_format(paper_format, this));
        let zoom = document.createElement("select");
        zoom.id = "zoom-selector";
        zoom.innerHTML = '<option value="0">Auto</option>';
        const zoom_values = [50, 75, 100, 125, 150, 200, 250];
        for (const value of zoom_values) {
            zoom.innerHTML += `<option value="${value / 100.0}">${value}%</option>`;
        }
        zoom.addEventListener('change', e => this.set_zoom(parseFloat(zoom.value)));
        let pdf_button = document.createElement("button");
        pdf_button.className = "big-button print-button";
        pdf_button.title = "Save as PDF";
        pdf_button.innerHTML = '<i class="bi bi-filetype-pdf"></i>';
        pdf_button.addEventListener("click", () => print_document(this.style_css(), this.stylist.get_document_title()));
        let guide_button = document.createElement("button");
        guide_button.className = "big-button guide-button";
        guide_button.title = "Load Guide";
        guide_button.innerHTML = '<i class="fa-solid fa-circle-question"></i> Guide';
        guide_button.addEventListener("click", (e) => this.file_manager.apply_data(Guide));
        buttonbar.appendChild(load_button);
        buttonbar.appendChild(load_input);
        buttonbar.appendChild(save_button);
        buttonbar.appendChild(paper_format);
        buttonbar.appendChild(zoom);
        buttonbar.appendChild(pdf_button);
        buttonbar.appendChild(guide_button);
        return buttonbar;
    }
    load_style(style) {
        this.stylist.apply(style);
        this.stylist.hot_load();
    }
    style_css() {
        return this.stylist.to_css();
    }
    get_text() {
        return this.text_editor.getValue();
    }
    get_css() {
        return this.css_editor.getValue();
    }
    clear_text() {
        let selection = this.editor.getSelection();
        selection.selectAll();
        this.editor.remove();
    }
    set_text(text) {
        this.set_text_session();
        this.clear_text();
        this.editor.insert(text);
    }
    set_css(css) {
        this.set_css_session();
        this.clear_text();
        this.editor.insert(css);
    }
    manage_unchanged_pages(page, delta) {
        if (delta > 0) {
            this.set_pages_number(this.pages.length + delta);
            // In order not to create pages and re-parse untouched pages
            // We swap their position in the table when we delete or remove other pages
            let i = this.pages.length - 1;
            while (i >= page + delta) {
                this.pages[i].innerHTML = this.pages[i - delta].innerHTML;
                i--;
            }
        }
        else if (delta < 0) {
            let i = page;
            while (i - delta < this.pages.length) {
                this.pages[i].innerHTML = this.pages[i - delta].innerHTML;
                i++;
            }
            this.set_pages_number(this.pages.length + delta);
        }
    }
    simple_parse(text) {
        return this.parser.simple_parse(text);
    }
    parse(data) {
        let first_page = 0;
        let text = this.get_text();
        let offset = 0;
        let start_offset = 0;
        let texts;
        let substitutions = this.stylist.get_substitutions();
        if (data) {
            let range = this.page_manager.get_range(text, data.page, data.updated);
            text = text.substring(range.start, range.end);
            first_page = data.page;
            if (range.end && range.end >= 0)
                offset = 1;
            if (data.page > 0)
                start_offset = 1;
            this.manage_unchanged_pages(first_page + 1, data.delta);
            texts = this.parser.parse(text, first_page, start_offset, offset, substitutions);
        }
        else {
            texts = this.parser.parse(text, 0, 0, 0, substitutions);
            this.set_pages_number(texts.length);
        }
        let webkit = isWebkit();
        for (let i = start_offset; i < texts.length - offset; i++) {
            let page = this.pages[first_page + i - start_offset];
            page.innerHTML = `<div class="page-content">${texts[i]}</div>`;
            // Adding class to Lettrine
            let headings = page.getElementsByTagName("h1");
            for (const h1 of headings) {
                let next = h1.nextElementSibling;
                if (!next) {
                    let parent = h1.parentElement;
                    if (parent && parent.classList.contains('chapter')) {
                        next = parent.nextElementSibling;
                    }
                }
                if (next && next instanceof HTMLParagraphElement) {
                    let lettrine = document.createElement('span');
                    let letter = next.innerText[0].toUpperCase();
                    lettrine.title = letter;
                    lettrine.innerHTML = letter;
                    lettrine.className = `${letter} lettrine`;
                    next.style.position = 'relative';
                    next.innerHTML = lettrine.outerHTML + next.innerHTML.substring(1);
                    //next.classList.add(next.innerText[0].toUpperCase())
                    if (webkit)
                        next.classList.add('webkit');
                }
            }
            this.stylist.apply_theme_keyword(page);
            // Adapt the column break to the new page
            let columns = page.getElementsByClassName('column-break');
            set_columnbreak(columns);
        }
    }
    create_page() {
        let newpage = document.createElement("div");
        newpage.className = "page";
        newpage.id = "page" + this.pages.length;
        this.pages.push(newpage);
        this.content.appendChild(newpage);
        return newpage;
    }
    set_pages_number(n) {
        let number = this.pages.length - n;
        if (number <= 0) {
            while (this.pages.length < n)
                this.create_page();
            return;
        }
        // Delete excess
        let deleted = this.pages.splice(n, number);
        for (const element of deleted)
            this.content.removeChild(element);
    }
    focus_page(element, offset = 0) {
        let page = element;
        while (page && !page.id.includes("page"))
            page = page.parentElement;
        if (!page)
            return;
        let page_number = parseInt(page.id.substring(4));
        let index = this.page_manager.get_positions()[page_number] + offset + 1;
        this.move_cursor_to_index(index);
    }
    move_cursor_to_index(index) {
        let position = this.editor.session.getDocument().indexToPosition(index);
        this.move_cursor_to_position(position);
    }
    move_cursor_to_position(position) {
        this.editor.scrollToLine(position.row, true, true);
        this.editor.getSelection().moveToPosition(position);
        this.editor.focus();
    }
    goto_page() {
        let position = this.editor.getSelectionRange().start;
        let index = this.editor.session.getDocument().positionToIndex(position);
        let page_index = this.page_manager.page_at_index(index);
        let page = document.getElementById(`page${page_index}`);
        if (page)
            page.scrollIntoView();
    }
    insert(at_start, at_end = "", keep_content = true) {
        let range = this.editor.getSelectionRange();
        if (!keep_content)
            this.editor.remove();
        this.editor.clearSelection();
        if (at_end && at_end != "") {
            this.editor.moveCursorToPosition(range.end);
            this.editor.insert(at_end);
        }
        this.editor.moveCursorToPosition(range.start);
        this.editor.insert(at_start);
        if (range.end.row != range.start.row && range.end.column != range.start.column) {
            range.end.column += at_start.length;
            this.editor.getSelection().selectToPosition(range.end);
        }
        this.move_cursor_to_position({ row: range.start.row, column: range.start.column + at_start.length });
    }
    insert_line(at_start, at_end = '', sep = '\n') {
        let text = this.editor.getSelectedText().split(sep);
        for (let i = 0; i < text.length; i++)
            text[i] = format(at_start, [`${i + 1}`]) + text[i] + at_end;
        text = text.join(sep);
        this.editor.insert(text);
        this.editor.focus();
    }
    update_zoom() {
        this.set_zoom(this.page_zoom);
    }
    set_zoom(value) {
        if (value == 0)
            this.fit_page();
        else
            this.zoom_page(value);
        this.page_zoom = value;
    }
    zoom_page(value, width, height) {
        if (!height || !width) {
            let page = document.getElementById('page0');
            if (page == null)
                return;
            if (!height)
                height = page.offsetHeight;
            if (!width)
                width = page.offsetWidth;
        }
        let w = width * value;
        let h = height * value;
        this.content.style.transformOrigin = "left top";
        this.content.style.position = "absolute";
        this.content.style.left = "unset";
        if (value >= 1) {
            if (w < this.right_panel.offsetWidth) {
                this.content.style.transformOrigin = "center top";
                w = width;
                h = height;
            }
            else {
                this.content.style.left = "15px";
                w = width + 30;
                h = height;
            }
        }
        this.content.style.transform = "scale(" + value + ")";
        this.content.style.width = w + "px";
        this.content.style.height = h + "px";
    }
    fit_page(rw, width, magic = 90) {
        if (!width) {
            let page = document.getElementById('page0');
            if (page == null)
                return;
            width = page.offsetWidth;
        }
        if (!rw)
            rw = this.right_panel.offsetWidth;
        let zoom = (rw - magic) / width;
        this.zoom_page(zoom, width);
    }
    generate_toc() {
        let toc = this.parser.get_toc();
        let toc_html = '[toc]\n\n# Table of Content\n\n';
        let previous_level = 1;
        for (let p = 0; p < toc.length; p++) {
            if (p >= this.pages.length)
                continue;
            for (let data in toc[p]) {
                let level = toc[p][data][0];
                let heading = toc[p][data][1];
                let page = p + 1;
                let padding = '';
                // Jumping multiple levels
                if (previous_level < level - 1) {
                    padding += '\t'.repeat(previous_level - 1);
                    padding += '\t-'.repeat(level - previous_level - 1) + '\t';
                }
                else
                    padding = '\t'.repeat(level - 1);
                toc_html += padding + `- ${heading} :: ${page}\n`;
                previous_level = level;
            }
        }
        return toc_html + '\n[/toc]';
    }
}
function resize(e) {
    if (e.stopPropagation)
        e.stopPropagation();
    if (e.preventDefault)
        e.preventDefault();
    this.editor.container.addEventListener("mousemove", resize_drag);
    this.editor.container.addEventListener("mouseup", resize_end);
}
function resize_end() {
    this.editor.container.removeEventListener("mousemove", resize_drag);
    this.editor.container.removeEventListener("mouseup", resize_end);
}
function resize_drag() {
    let width = this.offsetWidth;
    let page = document.getElementById('page0');
    if (page == null)
        return;
    let page_width = page.offsetWidth;
    let left_panel = this.editor.editor.container;
    let right_panel = this.editor.right_panel;
    let page_zoom = this.editor.page_zoom;
    // Padding of container * 2 + desired margin
    let magic = 30 * 2 + 30;
    let lw = MOUSE_POS.x - 3;
    let rw = width - lw - 3;
    if (page_zoom == 0) {
        right_panel.style.width = rw + "px";
        this.editor.fit_page(rw, page_width, magic);
    }
    else {
        right_panel.style.width = rw + "px";
        this.editor.update_zoom();
    }
    left_panel.style.width = lw + "px";
}
