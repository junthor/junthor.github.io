import { DraggableWindow } from "./DraggableWindow.js";
import { COLOR_PICKER_VARIABLES } from '../../config/properties.js';
export class ColorWindow {
    constructor(stylist) {
        this.stylist = stylist;
        // Link with the editor button
        const icon = '<i class="fa-solid fa-fill-drip"></i>';
        const name = 'Colors';
        const id = 'color-app';
        this.window = new DraggableWindow(id, `${icon} ${name}`);
        let button = document.getElementById(`${id}-button`);
        if (button) {
            button.innerHTML = icon;
            button.title = name;
            button.addEventListener('click', () => this.window.toggle_window());
        }
        // ---------------------------
        this.content = this.create_content();
        this.window.get_container().appendChild(this.content);
        document.body.appendChild(this.window.get_window());
    }
    restore_color(id, color) {
        let elt = document.getElementById(id);
        if (!elt)
            return;
        elt.value = color;
        elt.div.innerHTML = color;
        let parent = elt.parentElement;
        if (parent)
            parent.style.color = color;
    }
    create_content() {
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
}
