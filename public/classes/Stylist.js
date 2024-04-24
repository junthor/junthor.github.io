import { set_columnbreak } from "../Utils.js";
import { Popup } from "./Popup.js";
import { BRS } from "../theme/theme.js";
import { COLOR_PICKER_VARIABLES, SNIPPETS, FONT_BARBER_VARIABLES, lettrine_definition } from '../config/properties.js';
const PAPER = {
    Letter: { width: "215.9mm", height: "279.4mm" },
    A4: { width: "210mm", height: "297mm" },
    A5: { width: "148mm", height: "210mm" },
};
export class Stylist {
    constructor(editor, style = BRS) {
        this.editor = editor;
        this.undo_button = document.getElementById('undo-button');
        this.redo_button = document.getElementById('redo-button');
        this.templates = style.template;
        if (style.load) {
            this.styles = style.load[0].style;
            for (let i = 1; i < style.load.length; i++)
                this.merge(style.load[i].style);
            this.merge(style.style);
        }
        else
            this.styles = style.style;
        // Triggers the margin
        this.apply_lettrine_properties(this.styles[':root']['--lettrine-font']);
        this.color_variables = COLOR_PICKER_VARIABLES;
        this.font_variables = FONT_BARBER_VARIABLES;
        this.snippets = SNIPPETS;
        document.body.appendChild(this.create_color_picker());
        document.body.appendChild(this.create_text_customizer());
        document.body.appendChild(this.create_snippets_selector());
        // Load format
        const format = document.getElementById('format-selector');
        const width = this.styles[":root"]["--page-width"];
        const height = this.styles[":root"]["--page-height"];
        for (const size in PAPER) {
            let dim = PAPER[size];
            if (width == dim.width && height == dim.height && format)
                format.value = size;
        }
        this.undo_stack = [];
        this.redo_stack = [];
        this.custom_css = '';
    }
    set_custom_css(css) {
        this.custom_css = css;
        this.hot_load();
    }
    create_text_customizer() {
        let popup = new Popup();
        popup.get_window().id = 'text-barber-container';
        popup.set_title('<i class="fa-solid fa-pen-nib"></i> Text Tailor');
        let text_container = popup.get_content();
        text_container.style.position = "relative";
        let text_barber = document.createElement('div');
        text_barber.id = 'text-barber';
        let preview_box = document.createElement('div');
        preview_box.className = 'preview-box';
        const max_width = 'calc(100% - 350px)';
        let table = document.createElement("table");
        table.style.tableLayout = "fixed";
        table.innerHTML = `<thead><tr>
            <th style='width:${max_width}'>Element</th>
            <th style='width:200px'>Font Family</th>
            <th style='width:100px'>Size</th>
            <th style='width:50px'>Unit</th>
        </tr></thead>`;
        const font_units = `<option value="cm">cm</option>
        <option value="pt">pt</option>
        <option value="px">px</option>
        <option value="em">em</option>
        <option value="rem">rem</option>
        <option value="%">%</option>`;
        //text_container.appendChild(preview_box)
        text_container.appendChild(text_barber);
        for (const type in this.font_variables) {
            let font_container = document.createElement('div');
            font_container.className = 'text-barber-row';
            let family = document.createElement('select');
            for (const opt in this.font_variables[type].options) {
                let ff = this.font_variables[type].options[opt];
                family.innerHTML += `<option value="${ff}">${ff}</option>`;
            }
            let var_name = this.font_variables[type].family;
            family.value = this.styles[':root'][var_name];
            family.id = var_name;
            family.stylist = this;
            family.addEventListener('change', this.change_font);
            var_name = this.font_variables[type].size;
            let font_size = this.styles[':root'][var_name];
            let font_unit = font_size.replaceAll(/[\d.]/gi, '');
            let fs = parseFloat(font_size);
            let font_name = document.createElement('div');
            font_name.className = 'font-preview';
            font_name.style.maxWidth = '100%';
            font_name.innerHTML = this.font_variables[type].preview;
            let size = document.createElement('input');
            size.type = 'number';
            size.step = '0.1';
            size.value = `${fs}`;
            size.id = var_name;
            size.name = var_name;
            let units = document.createElement('select');
            units.innerHTML = font_units;
            units.value = font_unit;
            units.name = var_name;
            size.stylist = this;
            units.stylist = this;
            size.fu = units;
            units.fu = units;
            size.fs = size;
            units.fs = size;
            size.addEventListener('change', this.change_font_size);
            units.addEventListener('change', this.change_font_size);
            let row = document.createElement('tr');
            let td_0 = document.createElement("td");
            td_0.appendChild(font_name);
            let td_1 = document.createElement("td");
            td_1.appendChild(family);
            let td_2 = document.createElement("td");
            td_2.appendChild(size);
            let td_3 = document.createElement("td");
            td_3.appendChild(units);
            row.appendChild(td_0);
            row.appendChild(td_1);
            row.appendChild(td_2);
            row.appendChild(td_3);
            table.appendChild(row);
        }
        text_barber.appendChild(table);
        return popup.get_window();
    }
    create_color_picker() {
        let popup = new Popup();
        popup.get_window().id = 'color-picker-container';
        popup.set_title('<i class="fa-solid fa-palette"></i> Color Captain');
        let color_picker = popup.get_content();
        color_picker.id = 'color-picker';
        for (const category in this.color_variables) {
            let category_container = document.createElement('div');
            category_container.className = "category";
            category_container.innerHTML = `<div class='category-name'>${category}</div>`;
            for (let [text, id] of Object.entries(this.color_variables[category])) {
                let value = this.styles[':root'][id];
                let container = document.createElement('div');
                container.className = 'color-container full';
                let picker = document.createElement('input');
                picker.type = 'text';
                picker.className = 'color-selector';
                picker.id = id;
                picker.value = value;
                picker.setAttribute('data-coloris', '');
                picker.addEventListener('input', this.change_color);
                picker.addEventListener('change', this.change_color_delta);
                let name = document.createElement('div');
                name.className = 'color-name';
                name.innerText = text;
                let value_div = document.createElement('div');
                value_div.className = 'color-value';
                value_div.innerText = value;
                picker.stylist = this;
                picker.div = value_div;
                container.appendChild(value_div);
                container.appendChild(picker);
                container.appendChild(name);
                category_container.appendChild(container);
            }
            color_picker.appendChild(category_container);
        }
        return popup.get_window();
    }
    create_snippets_selector() {
        let popup = new Popup();
        popup.get_window().id = 'snippets-selector-container';
        popup.set_title('<i class="fa-solid fa-wand-magic-sparkles"></i> Snippets Sailor');
        let snippets_selector = popup.get_content();
        snippets_selector.className = "snippets-selector";
        let snippets_container = document.createElement('div');
        snippets_container.className = 'snippets-container';
        let column_category = document.createElement('div');
        column_category.className = 'column-category';
        let snippets_content = document.createElement('div');
        snippets_content.className = 'snippets-content';
        snippets_content.id = 'snippets-content';
        let page_preview = document.createElement('div');
        page_preview.className = 'page-preview';
        let block_preview = document.createElement('div');
        block_preview.className = 'block-preview';
        let mini_page = document.createElement('div');
        mini_page.className = 'mini-page';
        page_preview.appendChild(mini_page);
        snippets_selector.appendChild(snippets_container);
        snippets_selector.appendChild(page_preview);
        snippets_selector.appendChild(block_preview);
        snippets_container.appendChild(column_category);
        snippets_container.appendChild(snippets_content);
        for (const category in this.snippets) {
            let elt = document.createElement('div');
            elt.className = 'snippet-category';
            elt.innerHTML = category;
            column_category.appendChild(elt);
            const content = document.createElement('div');
            content.className = 'snippets-content';
            content.innerHTML = `<div class="snippet-category-name">${category}</div>`;
            const item_display = document.createElement('div');
            item_display.style.columns = "2";
            item_display.style.padding = "8px";
            content.appendChild(item_display);
            for (const i in this.snippets[category]) {
                let item = this.snippets[category][i];
                let item_elt = document.createElement('div');
                item_elt.className = 'item';
                item_elt.innerHTML = item[0];
                if (item.length > 3)
                    item_elt.addEventListener('click', e => this.set_root_value(item[3], item[4], 'root_value'));
                else
                    item_elt.addEventListener('click', e => this.editor.insert(item[1]));
                item_elt.addEventListener('mouseenter', e => {
                    if (item[2] == 'block') {
                        block_preview.innerHTML = this.editor.simple_parse(item[1]);
                        page_preview.style.display = "none";
                        block_preview.style.display = "block";
                    }
                    else {
                        mini_page.innerHTML = this.editor.simple_parse(item[1]);
                        block_preview.style.display = "none";
                        page_preview.style.display = "flex";
                    }
                });
                item_display.appendChild(item_elt);
            }
            elt.addEventListener('click', e => this.replace_snippet_content(content));
        }
        return popup.get_window();
    }
    replace_snippet_content(elt) {
        let content = document.getElementById('snippets-content');
        let parent = content?.parentElement;
        if (!parent || !content)
            return;
        parent.removeChild(content);
        parent.appendChild(elt);
        elt.id = 'snippets-content';
    }
    do(delta, mode) {
        for (let action of delta) {
            let nature = action.action;
            let value = mode == 'undo' ? action.old_value : action.new_value;
            if (nature == 'font') {
                if (action.property == '--lettrine-font')
                    this.apply_lettrine_properties(value);
                let family = document.getElementById(action.property);
                family.value = value;
            }
            else if (nature == 'color') {
                let elt = document.getElementById(action.property);
                elt.value = value;
                elt.value_div.innerHTML = value;
                elt.parentElement.style.color = value;
            }
            else if (nature == 'font_size') {
                let size = document.getElementById(action.property);
                let font_size = value;
                let font_unit = font_size.replaceAll(/[\d.]/gi, '');
                size.value = parseFloat(font_size);
                size.unit.value = font_unit;
            }
            if (nature == 'style') {
                this.styles = value;
            }
            else if (nature == 'template') {
                this.templates = value;
            }
            else
                this.set_root_value(action.property, value);
        }
        this.hot_load();
        if (mode == 'undo')
            this.redo_stack.push(delta);
        else
            this.undo_stack.push(delta);
        if (!this.undo_button || !this.redo_button)
            return;
        if (this.undo_stack.length == 0)
            this.undo_button.className = 'disabled';
        else
            this.undo_button.className = '';
        if (this.redo_stack.length == 0)
            this.redo_button.className = 'disabled';
        else
            this.redo_button.className = '';
    }
    undo() {
        let delta = this.undo_stack.pop();
        if (delta)
            this.do(delta, 'undo');
    }
    redo() {
        let delta = this.redo_stack.pop();
        if (delta)
            this.do(delta, 'redo');
    }
    new_delta() { this.delta = []; }
    save_delta() {
        if (!this.delta)
            return;
        this.undo_stack.push(this.delta);
        this.redo_stack = [];
        this.delta = undefined;
        if (this.undo_button)
            this.undo_button.className = '';
        if (this.redo_button)
            this.redo_button.className = 'disabled';
    }
    add_to_delta(section, property, new_value, action, old_value) {
        if (!this.delta)
            return;
        if (!old_value)
            old_value = this.styles[section][property];
        this.delta.push({
            action: action,
            section: section, property: property,
            old_value: old_value, new_value: new_value
        });
    }
    set_root_value(key, value, delta) {
        if (delta) {
            if (!this.delta) {
                this.new_delta();
                this.add_to_delta(':root', key, value, delta);
                this.save_delta();
            }
            else
                this.add_to_delta(':root', key, value, delta);
        }
        this.styles[':root'][key] = value;
        this.hot_load();
        set_columnbreak(document.getElementsByClassName('column-break'));
    }
    set_page_format(input, editor) {
        if (PAPER[input.value]) {
            this.styles[':root']['--page-width'] = PAPER[input.value].width;
            this.styles[':root']['--page-height'] = PAPER[input.value].height;
        }
        else {
            // A4 is default
            this.styles[":root"]["--page-width"] = "210mm";
            this.styles[":root"]["--page-height"] = "297mm";
        }
        this.hot_load();
        set_columnbreak(document.getElementsByClassName('column-break'));
        if (editor)
            editor.update_zoom();
    }
    apply_lettrine_properties(font) {
        let definition = lettrine_definition[font];
        if (!definition)
            definition = lettrine_definition['default'];
        for (let property in definition) {
            for (let l in definition[property]) {
                let letter = definition[property][l];
                let key = `--lettrine-letter-${letter}`;
                this.styles[':root'][key] = property;
            }
        }
        setTimeout(() => this.hot_load(), 100);
    }
    change_font() {
        this.stylist.new_delta();
        if (this.id == '--lettrine-font')
            this.stylist.apply_lettrine_properties(this.value);
        this.stylist.set_root_value(this.id, this.value, 'font');
        this.stylist.save_delta();
    }
    change_font_size() {
        this.stylist.new_delta();
        this.stylist.set_root_value(this.fs.id, this.fs.value + this.fu.value, 'font_size');
        this.stylist.save_delta();
    }
    change_color() {
        if (!this.stylist.color_tmp) {
            this.stylist.color_tmp = this.stylist.styles[':root'][this.id];
        }
        this.stylist.set_root_value(this.id, this.value);
        this.div.innerHTML = this.value;
    }
    change_color_delta() {
        this.stylist.new_delta();
        if (!this.stylist.color_tmp)
            this.stylist.color_tmp = this.value;
        this.stylist.styles[':root'][this.id] = this.stylist.color_tmp;
        this.stylist.set_root_value(this.id, this.value, 'color');
        this.stylist.save_delta();
        this.stylist.color_tmp = undefined;
    }
    get_style() {
        return this.styles;
    }
    get_templates() {
        return this.templates;
    }
    get_font(font, from = ':root') {
        if (!this.styles[from])
            return undefined;
        return this.styles[from][font];
    }
    apply(style, delta = true) {
        let old_style;
        let old_template;
        if (delta) {
            old_style = this.styles;
            old_template = style.template;
        }
        this.templates = style.template;
        if ('load' in style && style.load) {
            this.styles = style.load[0].style;
            for (let i = 1; i < style.load.length; i++)
                this.merge(style.load[i].style);
            this.merge(style.style);
        }
        else
            this.styles = style.style;
        if (old_style) {
            this.new_delta();
            this.add_to_delta('', '', this.styles, 'style', old_style);
            this.add_to_delta('', '', this.templates, 'template', old_template);
            this.save_delta();
        }
        // Load colors
        for (const category in this.color_variables) {
            for (let [name, color] of Object.entries(this.color_variables[category])) {
                let picker = document.getElementById(color);
                picker.value = this.styles[':root'][color];
                picker.div.innerHTML = picker.value;
                if (picker.parentElement)
                    picker.parentElement.style.color = picker.value;
            }
        }
        // Load fonts
        for (const font in this.font_variables) {
            let data = this.font_variables[font];
            let ff = data.family;
            let fs = data.size;
            let family = document.getElementById(ff);
            let size = document.getElementById(fs);
            let font_size = this.styles[':root'][fs];
            let font_unit = font_size.replaceAll(/[\d.]/gi, '');
            family.value = this.styles[':root'][ff];
            size.fs.value = font_size.substring(0, font_size.length - font_unit.length);
            size.fu.value = font_unit;
        }
        // Load format
        const format = document.getElementById('format-selector');
        const width = this.styles[":root"]["--page-width"];
        const height = this.styles[":root"]["--page-height"];
        for (const size in PAPER) {
            let dim = PAPER[size];
            if (width == dim.width && height == dim.height && format)
                format.value = size;
        }
        // Triggers the margin
        this.apply_lettrine_properties(this.styles[':root']['--lettrine-font']);
        this.hot_load();
        set_columnbreak(document.getElementsByClassName('column-break'));
    }
    merge(style) {
        for (let [key, properties] of Object.entries(style)) {
            if (!this.styles[key])
                this.styles[key] = {};
            for (let [property, value] of Object.entries(properties)) {
                this.styles[key][property] = value;
            }
        }
    }
    to_css() {
        let css = [];
        for (let [key, properties] of Object.entries(this.styles)) {
            let style = [key + ' {'];
            for (let [property, value] of Object.entries(properties)) {
                style.push('\t' + property + ": " + value + ";");
            }
            css.push(style.join('\n') + '}\n');
        }
        let sheets = '';
        for (let sheet of this.templates) {
            sheets += `<link rel="stylesheet" href="./styles/css/${sheet}"></link>`;
        }
        return sheets + '<style>\n' + css.join('') + '</style>\n';
    }
    hot_load() {
        let css = this.to_css() + '\n<style>' + this.custom_css + '</style>';
        let qs = document.getElementById('quick-style');
        if (qs)
            qs.innerHTML = css;
        return css;
    }
}
