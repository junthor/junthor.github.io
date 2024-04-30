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
            <th style='width:50px'>Unit</th>
        </tr></thead>`;
        const font_units = `<option value="cm">cm</option>
        <option value="pt">pt</option>
        <option value="px">px</option>
        <option value="em">em</option>
        <option value="rem">rem</option>
        <option value="%">%</option>`;
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
            let font_unit = font_size.replaceAll(/[\d.]/gi, '');
            let fs = parseFloat(font_size);
            let font_name = document.createElement('div');
            font_name.className = 'font-preview';
            font_name.style.maxWidth = '100%';
            font_name.innerHTML = FONT_BARBER_VARIABLES[type].preview;
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
            size.stylist = this.stylist;
            units.stylist = this.stylist;
            size.fu = units;
            units.fu = units;
            size.fs = size;
            units.fs = size;
            size.addEventListener('change', this.stylist.change_font_size);
            units.addEventListener('change', this.stylist.change_font_size);
            let row = document.createElement('tr');
            let td_0 = document.createElement("td");
            let td_1 = document.createElement("td");
            let td_2 = document.createElement("td");
            let td_3 = document.createElement("td");
            td_0.appendChild(font_name);
            td_1.appendChild(family);
            td_2.appendChild(size);
            td_3.appendChild(units);
            row.appendChild(td_0);
            row.appendChild(td_1);
            row.appendChild(td_2);
            row.appendChild(td_3);
            table.appendChild(row);
        }
        text_barber.appendChild(table);
        return text_barber;
    }
}
