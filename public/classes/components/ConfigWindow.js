import { DraggableWindow } from "./DraggableWindow.js";
import { THEMES } from "../../theme/theme.js";
export class ConfigWindow {
    constructor(stylist, title, margin) {
        this.title = title;
        this.margin = margin;
        this.stylist = stylist;
        // Link with the editor button
        const icon = '<i class="fa-solid fa-gear"></i>';
        const name = 'Document Settings';
        const id = 'config-app';
        this.window = new DraggableWindow(id, `${icon} ${name}`);
        let button = document.getElementById(`${id}-button`);
        if (button) {
            button.innerHTML = icon;
            button.title = name;
            button.addEventListener('click', () => this.window.toggle_window());
        }
        // ---------------------------
        this.substitutions = [
            [true, '...', '…'],
            [true, '-->', ' → '],
            [true, '<--', ' ← '],
            [true, '==>', ' ⇒ '],
            [true, '<== ', ' ⇐ '],
            [true, ' --- ', ' — '],
            [true, ' -- ', ' – '],
            [true, '"', '“'],
            [true, '\'\'', '”'],
            [false, '(c)', '©'],
            [false, '(r)', '®'],
        ];
        this.general_tab = this.create_general_tab();
        this.variable_tab = this.create_variable_tab();
        this.substitution_tab = this.create_substitution_tab();
        this.categories = {
            General: this.general_tab,
            Substitutions: this.substitution_tab
        };
        this.column = this.window.create_column(this.categories);
        this.window.get_container().appendChild(this.column);
        let first_button = this.column.children[0];
        first_button.click();
        document.body.appendChild(this.window.get_window());
    }
    create_general_tab() {
        let general_tab = document.createElement('div');
        general_tab.className = 'window-content';
        const label_width = '80px';
        // Title input
        let title_field = document.createElement('div');
        let title_label = document.createElement('label');
        let title_input = document.createElement('input');
        title_input.id = 'input_title';
        title_input.placeholder = 'Title';
        title_input.value = 'My Document';
        title_label.innerHTML = 'Title';
        title_label.style.width = label_width;
        title_field.className = 'field';
        title_field.appendChild(title_label);
        title_field.appendChild(title_input);
        title_input.addEventListener('input', () => this.stylist.set_document_title(title_input.value));
        // LAYOUT SECTION
        // Columns (1, 2, 3 ...)
        let columns_field = document.createElement('div');
        let columns_label = document.createElement('label');
        let columns_input = document.createElement('select');
        columns_input.id = '--column-count';
        columns_input.innerHTML = '<option value="1">1</option>';
        columns_input.innerHTML += '<option value="2">2</option>';
        columns_input.innerHTML += '<option value="3">3</option>';
        columns_input.value = '2';
        columns_label.innerHTML = 'Columns';
        columns_label.style.width = label_width;
        columns_field.className = 'field';
        columns_input.addEventListener('change', () => {
            this.stylist.set_root_value('--column-count', columns_input.value, 'input');
        });
        columns_field.appendChild(columns_label);
        columns_field.appendChild(columns_input);
        // Margin input
        let margins = document.createElement('div');
        // Top, Right, Bottom and Left
        for (let align of ['Top', 'Bottom', 'Left', 'Right']) {
            let margin = document.createElement('div');
            margin.className = 'field';
            let margin_label = document.createElement('label');
            margin_label.style.width = label_width;
            let margin_input = document.createElement('input');
            margin_label.innerHTML = `Margin<br>${align}`;
            margin.appendChild(margin_label);
            margin.appendChild(margin_input);
            margin_input.id = `--page-margin-${align.toLowerCase()}`;
            margins.appendChild(margin);
            margin_input.pattern = '\\d+(\\.\\d+)?(cm|mm|px|pt|in|em|rem)';
            margin_input.title = 'Should be a valid size (cm, mm, px, pt, in, em, rem)';
            margin_input.value = this.stylist.get_root_value(margin_input.id);
            margin_input.addEventListener('change', () => {
                if (margin_input.reportValidity())
                    this.stylist.set_root_value(margin_input.id, margin_input.value, 'input');
                else
                    margin_input.value = this.stylist.get_root_value(margin_input.id);
            });
        }
        // Themes
        let theme_field = document.createElement('div');
        let theme_label = document.createElement('label');
        let theme_input = document.createElement('select');
        for (let i in THEMES) {
            let theme = THEMES[i];
            theme_input.innerHTML += `<option value='${i}'>${theme[0]}</option>`;
        }
        theme_input.addEventListener('change', () => this.stylist.apply(THEMES[theme_input.value][1]));
        theme_field.className = 'field';
        theme_label.innerHTML = 'Theme';
        theme_label.style.width = label_width;
        theme_field.appendChild(theme_label);
        theme_field.appendChild(theme_input);
        general_tab.appendChild(this.window.create_section('Document'));
        general_tab.appendChild(title_field);
        general_tab.appendChild(theme_field);
        general_tab.appendChild(this.window.create_section('Page Layout'));
        general_tab.appendChild(columns_field);
        general_tab.appendChild(margins);
        return general_tab;
    }
    create_variable_tab() {
        let variable_tab = document.createElement('div');
        variable_tab.className = 'window-content';
        return variable_tab;
    }
    create_substitution_tab() {
        let auto_swap_tab = document.createElement('div');
        auto_swap_tab.className = 'window-content';
        auto_swap_tab.appendChild(this.window.create_section('Substitutions'));
        let table = document.createElement('table');
        table.innerHTML += '<thead><tr><th></th><th>Replace</th><th>By</th></thead>';
        for (let i in this.substitutions) {
            let tuple = this.substitutions[i];
            let field = document.createElement('tr');
            let cell1 = document.createElement('td');
            let cell2 = document.createElement('td');
            let cell3 = document.createElement('td');
            field.appendChild(cell1);
            field.appendChild(cell2);
            field.appendChild(cell3);
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = tuple[0];
            let replace = document.createElement('input');
            let by = document.createElement('input');
            replace.value = tuple[1];
            replace.className = 'mono';
            by.value = tuple[2];
            by.style.fontFamily = 'var(--text-font)';
            replace.readOnly = true;
            by.readOnly = true;
            checkbox.addEventListener('change', () => {
                tuple[0] = !tuple[0];
                this.stylist.substitute(i, tuple);
            });
            cell1.align = 'center';
            cell1.appendChild(checkbox);
            cell2.appendChild(replace);
            cell3.appendChild(by);
            table.appendChild(field);
        }
        auto_swap_tab.appendChild(table);
        return auto_swap_tab;
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
    set_title(title) {
        this.title = title;
    }
    get_title() {
        return this.title;
    }
    set_margin(margin) {
        this.margin = margin;
    }
    get_margin() {
        return this.margin;
    }
    get_substitutions() {
        return this.substitutions;
    }
}
