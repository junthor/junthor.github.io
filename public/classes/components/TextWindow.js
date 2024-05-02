import { DraggableWindow } from "./DraggableWindow.js";
import { FONT_BARBER_VARIABLES } from '../../config/properties.js';
export class TextWindow {
    constructor(stylist) {
        this.stylist = stylist;
        // Link with the editor button
        const icon = '<i class="fa-solid fa-pen-nib"></i>';
        const name = 'Fonts';
        const id = 'text-app';
        this.window = new DraggableWindow(id, `${icon} ${name}`);
        let button = document.getElementById(`${id}-button`);
        if (button) {
            button.innerHTML = icon;
            button.title = name;
            button.addEventListener('click', () => this.window.toggle_window());
        }
        // ---------------------------
        this.content = this.create_text_customizer();
        this.window.get_container().appendChild(this.content);
        document.body.appendChild(this.window.get_window());
    }
    create_text_customizer() {
        let text_barber = this.window.create_content();
        text_barber.id = 'text-barber';
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
            td_1.appendChild(family);
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
}
