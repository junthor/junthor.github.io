import { DraggableWindow } from "./DraggableWindow.js";
import { FONT_BARBER_VARIABLES, COLOR_PICKER_VARIABLES } from '../../config/properties.js';
import { THEMES } from "../../theme/theme.js";
export class ThemeWindow {
    constructor(stylist) {
        this.stylist = stylist;
        // Link with the editor button
        const icon = '<i class="fa-solid fa-palette"></i>';
        const name = 'Theme';
        const id = 'theme-app';
        this.window = new DraggableWindow(id, `${icon} ${name}`);
        let button = document.getElementById(`${id}-button`);
        if (button) {
            button.innerHTML = icon;
            button.title = name;
            button.addEventListener('click', () => this.window.toggle_window());
        }
        // ---------------------------
        this.categories = {
            General: this.create_general(),
            Fonts: this.create_fonts(),
            Colors: this.create_colors()
        };
        this.column = this.window.create_column(this.categories);
        let first_button = this.column.children[0];
        first_button.click();
        document.body.appendChild(this.window.get_window());
    }
    create_general() {
        let content = this.window.create_content();
        //theme_input.addEventListener('change', () => this.stylist.apply(THEMES[theme_input.value][1]))
        for (let rpg in THEMES) {
            let container = document.createElement('div');
            let section = this.window.create_section(rpg);
            let themes = THEMES[rpg];
            content.appendChild(section);
            container.className = 'spoiler';
            container.style.columns = "2";
            container.style.padding = "8px";
            for (let theme in themes) {
                let item = themes[theme];
                let item_elt = document.createElement('div');
                item_elt.className = 'item';
                console.log(theme);
                item_elt.innerHTML = item[0];
                item_elt.addEventListener('click', () => this.stylist.apply(item[1]));
                container.appendChild(item_elt);
            }
            this.window.create_spoiler(section, container);
            content.appendChild(container);
        }
        return content;
    }
    create_fonts() {
        let text_barber = this.window.create_content();
        text_barber.id = 'text-barber';
        let EV_CHANGE = new UIEvent('change');
        const max_width = 'calc(100% - 350px)';
        let table = document.createElement("table");
        table.style.tableLayout = "fixed";
        table.innerHTML = `
        <thead><tr>
            <th style='width:${max_width}'>Element</th>
            <th style='width:200px'>Font Family</th>
            <th style='width:100px'>Size</th>
            <th style='width:50px'>Bold</th>
            <th style='width:50px'>Italic</th>
        </tr></thead>`;
        for (const type in FONT_BARBER_VARIABLES) {
            let font_container = document.createElement('div');
            font_container.className = 'text-barber-row';
            let family = document.createElement('select');
            for (const opt in FONT_BARBER_VARIABLES[type].options) {
                let ff = FONT_BARBER_VARIABLES[type].options[opt];
                family.innerHTML += `<option value="${ff}">${ff}</option>`;
            }
            let var_name = FONT_BARBER_VARIABLES[type].family;
            family.value = this.stylist.get_root_value(var_name);
            family.id = var_name;
            family.stylist = this.stylist;
            family.addEventListener('change', this.stylist.change_font);
            let custom_input = document.createElement('input');
            custom_input.addEventListener('change', this.stylist.change_font);
            custom_input.style.display = 'none';
            custom_input.id = var_name + "-custom";
            custom_input.stylist = this.stylist;
            custom_input.style.width = '173px';
            let custom_check = document.createElement('input');
            custom_check.type = "checkbox";
            custom_check.id = var_name + "-check";
            custom_check.title = "Custom Font";
            custom_check.style.marginRight = '4px';
            custom_check.addEventListener('change', () => {
                if (custom_check.checked) {
                    family.style.display = 'none';
                    custom_input.style.display = '';
                    custom_input.dispatchEvent(EV_CHANGE);
                }
                else {
                    family.style.display = '';
                    custom_input.style.display = 'none';
                    family.dispatchEvent(EV_CHANGE);
                }
            });
            var_name = FONT_BARBER_VARIABLES[type].size;
            let font_size = this.stylist.get_root_value(var_name);
            let font_name = document.createElement('div');
            font_name.className = 'font-preview';
            font_name.style.maxWidth = '100%';
            font_name.innerHTML = FONT_BARBER_VARIABLES[type].preview;
            let size_input = document.createElement('input');
            size_input.pattern = '\\d+(\\.\\d+)?(cm|mm|px|pt|in|em|rem|%)';
            size_input.title = 'Should be a valid size (cm, mm, px, pt, in, em, rem, %)';
            size_input.value = font_size;
            size_input.id = var_name;
            size_input.style.textAlign = 'center';
            // STYLE
            let font_weight = FONT_BARBER_VARIABLES[type].weight;
            let font_italic = FONT_BARBER_VARIABLES[type].italic;
            let bold_check = document.createElement('input');
            let italic_check = document.createElement('input');
            bold_check.type = "checkbox";
            italic_check.type = 'checkbox';
            if (font_weight) {
                bold_check.id = font_weight;
                bold_check.name = 'bold';
                bold_check.checked = this.stylist.get_root_value(font_weight) == "bold";
                bold_check.addEventListener('change', () => {
                    this.stylist.set_root_value(font_weight, bold_check.checked ? 'bold' : 'normal', 'check');
                });
            }
            if (font_italic) {
                italic_check.id = font_italic;
                italic_check.name = 'italic';
                italic_check.checked = this.stylist.get_root_value(font_italic) == "italic";
                italic_check.addEventListener('change', () => {
                    this.stylist.set_root_value(font_italic, italic_check.checked ? 'italic' : 'normal', 'check');
                });
            }
            // -----------------
            size_input.addEventListener('change', () => {
                if (size_input.reportValidity())
                    this.stylist.set_root_value(size_input.id, size_input.value, 'input');
                else
                    size_input.value = this.stylist.get_root_value(size_input.id);
            });
            let row = document.createElement('tr');
            let td_0 = document.createElement("td");
            let td_1 = document.createElement("td");
            let td_2 = document.createElement("td");
            let td_3 = document.createElement("td");
            let td_4 = document.createElement("td");
            td_0.appendChild(font_name);
            td_1.appendChild(custom_check);
            td_1.appendChild(family);
            td_1.appendChild(custom_input);
            td_2.appendChild(size_input);
            if (font_weight)
                td_3.appendChild(bold_check);
            if (font_italic)
                td_4.appendChild(italic_check);
            row.appendChild(td_0);
            row.appendChild(td_1);
            row.appendChild(td_2);
            row.appendChild(td_3);
            row.appendChild(td_4);
            table.appendChild(row);
        }
        text_barber.appendChild(table);
        return text_barber;
    }
    restore_color(id, color) {
        let elt = document.getElementById(id);
        console.log(elt);
        if (!elt)
            return;
        elt.value = color;
        elt.div.innerHTML = color;
        let parent = elt.parentElement;
        if (parent)
            parent.style.color = color;
    }
    create_colors() {
        let color_picker = this.window.create_content();
        color_picker.id = 'color-picker';
        for (const category in COLOR_PICKER_VARIABLES) {
            color_picker.appendChild(this.window.create_section(category));
            let category_container = document.createElement('div');
            category_container.className = "category";
            for (let [text, id] of Object.entries(COLOR_PICKER_VARIABLES[category])) {
                let value = this.stylist.get_root_value(id);
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
                picker.window = this;
                picker.div = value_div;
                container.appendChild(value_div);
                container.appendChild(picker);
                container.appendChild(name);
                category_container.appendChild(container);
            }
            color_picker.appendChild(category_container);
        }
        return color_picker;
    }
    change_color() {
        if (!this.window.color_tmp) {
            this.window.color_tmp = this.window.stylist.get_root_value(this.id);
        }
        this.window.stylist.set_root_value(this.id, this.value);
        this.div.innerHTML = this.value;
    }
    change_color_delta() {
        let stylist = this.window.stylist;
        let old_color = this.window.color_tmp;
        stylist.set_root_value(this.id, this.value, 'color', old_color);
        this.window.color_tmp = undefined;
    }
    sync_colors() {
        for (const category in COLOR_PICKER_VARIABLES) {
            for (let name in COLOR_PICKER_VARIABLES[category]) {
                let color = COLOR_PICKER_VARIABLES[category][name];
                let picker = document.getElementById(color);
                picker.value = this.stylist.get_root_value(color);
                picker.div.innerHTML = picker.value;
                picker.style.color = picker.value;
                if (picker.parentElement && picker.parentElement.className == "clr-field")
                    picker.parentElement.style.color = picker.value;
            }
        }
    }
    sync_fonts() {
        for (const font in FONT_BARBER_VARIABLES) {
            let data = FONT_BARBER_VARIABLES[font];
            let ff = data.family;
            let fs = data.size;
            let fw = data.weight;
            let fi = data.italic;
            let family = document.getElementById(ff);
            let size = document.getElementById(fs);
            let checkbox = document.getElementById(ff + "-check");
            let old_value = family.value;
            family.value = this.stylist.get_root_value(ff);
            // If not an option = custom font
            if (family.value == '') {
                if (!checkbox.checked) {
                    checkbox.checked = true;
                    family.style.display = 'none';
                }
                family.value = old_value;
                family = document.getElementById(ff + "-custom");
                family.value = this.stylist.get_root_value(ff);
                family.style.display = '';
            }
            size.value = this.stylist.get_root_value(fs);
            if (fw) {
                let weight = document.getElementById(fw);
                weight.checked = this.stylist.get_root_value(fw) == weight.name;
            }
            if (fi) {
                let italic = document.getElementById(fi);
                italic.checked = this.stylist.get_root_value(fi) == italic.name;
            }
        }
    }
}
