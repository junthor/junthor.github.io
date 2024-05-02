import { style_copy } from "../definition.js";
import { set_columnbreak } from "../Utils.js";
import { ConfigWindow } from "./components/ConfigWindow.js";
import { TextWindow } from './components/TextWindow.js';
import { ColorWindow } from "./components/ColorWindow.js";
import { THEMES } from "../theme/theme.js";
import { SP_KEYWORDS } from "../config/tags.js";
import { COLOR_PICKER_VARIABLES, FONT_BARBER_VARIABLES, lettrine_definition } from '../config/properties.js';
import { SnippetsWindow } from "./components/SnippetsWindow.js";
const PAPER = {
    Letter: { width: "215.9mm", height: "279.4mm" },
    A4: { width: "210mm", height: "297mm" },
    A5: { width: "148mm", height: "210mm" },
};
export class Stylist {
    constructor(editor, style = THEMES.BRS[1]) {
        this.editor = editor;
        this.keyword = style.keyword || '';
        this.document_title = 'My Document';
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
        this.snippets = new SnippetsWindow(editor, this);
        this.text = new TextWindow(this);
        this.color = new ColorWindow(this);
        // Load format
        const format = document.getElementById('format-selector');
        const width = this.styles[":root"]["--page-width"];
        const height = this.styles[":root"]["--page-height"];
        for (const size in PAPER) {
            let dim = PAPER[size];
            if (width == dim.width && height == dim.height && format)
                format.value = size;
        }
        this.config = new ConfigWindow(this, 'My Document', []);
        this.undo_stack = [];
        this.redo_stack = [];
        this.custom_css = '';
    }
    /**
     * Update the current page
     * @param page Page being changed
     */
    apply_theme_keyword(page) {
        if (!this.keyword || this.keyword == '')
            return;
        let elements = page.getElementsByClassName(SP_KEYWORDS.theme);
        for (let element of elements)
            element.classList.add(this.keyword);
    }
    /**
     * Update the whole document
     */
    set_theme_keyword(value) {
        if (value == this.keyword)
            return;
        let pages = document.getElementById('page-container');
        if (!pages)
            return;
        let elements = pages.getElementsByClassName(SP_KEYWORDS.theme);
        for (let element of elements) {
            if (this.keyword != '')
                element.classList.remove(this.keyword);
            if (value != '')
                element.classList.add(value);
        }
        this.keyword = value;
    }
    get_keyword() {
        return this.keyword;
    }
    set_document_title(title) {
        this.document_title = title;
    }
    get_document_title() {
        return this.document_title;
    }
    get_substitutions() {
        return this.config.get_substitutions();
    }
    substitute(i, sub) {
        let elements = document.getElementsByClassName(`substitute-${i}`);
        let value = sub[0] ? sub[2] : sub[1];
        for (let element of elements)
            element.innerHTML = value;
    }
    set_custom_css(css) {
        this.custom_css = css;
        this.hot_load();
    }
    do(delta, mode) {
        for (let action of delta) {
            let nature = action.action;
            let value = mode == 'undo' ? action.old_value : action.new_value;
            switch (nature) {
                case 'font':
                    if (action.property == '--lettrine-font')
                        this.apply_lettrine_properties(value);
                    let family = document.getElementById(action.property);
                    family.value = value;
                    break;
                case 'color':
                    this.color.restore_color(action.property, value);
                    break;
                case 'input':
                    let input = document.getElementById(action.property);
                    if (input)
                        input.value = value;
                    break;
                case 'check':
                    let check = document.getElementById(action.property);
                    if (check)
                        check.checked = value == check.name;
                    break;
            }
            if (nature == 'style')
                this.styles = value;
            else if (nature == 'template')
                this.templates = value;
            else if (nature == 'keyword')
                this.set_theme_keyword(value);
            else
                this.set_root_value(action.property, value);
        }
        // Load margin
        this.config.update_layout();
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
        if (old_value == undefined)
            old_value = this.styles[section][property];
        this.delta.push({
            action: action,
            section: section, property: property,
            old_value: old_value, new_value: new_value
        });
    }
    get_root_value(key) {
        return this.styles[':root'][key];
    }
    set_root_value(key, value, delta, old_value) {
        if (delta) {
            if (!old_value)
                old_value = this.styles[':root'][key];
            if (!this.delta) {
                this.new_delta();
                this.add_to_delta(':root', key, value, delta, old_value);
                this.save_delta();
            }
            else
                this.add_to_delta(':root', key, value, delta, old_value);
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
    // MARK: APPLY
    apply(style, delta = true) {
        let old_style;
        let old_template;
        let old_keyword;
        if (delta) {
            old_style = this.styles;
            old_template = this.templates;
            old_keyword = this.keyword || '';
        }
        this.templates = style.template;
        if ('load' in style && style.load) {
            this.styles = style_copy(style.load[0].style);
            for (let i = 1; i < style.load.length; i++)
                this.merge(style.load[i].style);
            this.merge(style.style);
        }
        else
            this.styles = style_copy(style.style);
        // Set the keyword
        let new_keyword = style.keyword || '';
        this.set_theme_keyword(new_keyword);
        if (old_style) {
            this.new_delta();
            this.add_to_delta('', '', this.styles, 'style', old_style);
            this.add_to_delta('', '', this.templates, 'template', old_template);
            this.add_to_delta('', '', this.keyword, 'keyword', old_keyword);
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
            let fw = data.weight;
            let fi = data.italic;
            let family = document.getElementById(ff);
            let size = document.getElementById(fs);
            family.value = this.styles[':root'][ff];
            size.value = this.styles[':root'][fs];
            if (fw) {
                let weight = document.getElementById(fw);
                weight.checked = this.styles[':root'][fw] == weight.name;
            }
            if (fi) {
                let italic = document.getElementById(fi);
                italic.checked = this.styles[':root'][fi] == italic.name;
            }
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
        // Load margin
        this.config.update_layout();
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
