import { MOUSE_POS } from "../../Utils.js";
const POPUP_ELEMENT = {
    window: undefined,
    pos: [0, 0],
    cursor: [0, 0],
};
export class DraggableWindow {
    constructor(id, title) {
        this.window = document.createElement('div');
        this.window.className = "window-popup";
        this.window.style.visibility = "hidden";
        DraggableWindow.DRAG_WINDOWS.push(this.window);
        this.window.addEventListener('mousedown', () => this.go_front(this.window));
        // Header (title + close)
        let header = document.createElement("div");
        header.className = "window-header";
        this.title = document.createElement("div");
        this.title.className = "window-title";
        header.appendChild(this.title);
        header.addEventListener("mousedown", drag_start);
        header.window = this.window;
        header.titlebar = this.title;
        let close_button = document.createElement("div");
        close_button.className = "close-button";
        close_button.addEventListener("click", this.close_window);
        close_button.innerHTML = '<i class="bi bi-x"></i>';
        close_button.window = this.window;
        header.appendChild(close_button);
        this.content_container = document.createElement("div");
        this.content_container.className = 'window-container';
        let relative_body = document.createElement('div');
        relative_body.style.position = 'relative';
        relative_body.appendChild(header);
        relative_body.appendChild(this.content_container);
        this.window.appendChild(relative_body);
        if (title)
            this.set_title(title);
        if (id)
            this.window.id = id;
    }
    create_section(label) {
        let section = document.createElement('div');
        section.className = 'section';
        section.innerHTML = label;
        return section;
    }
    create_column(categories) {
        let column = document.createElement('div');
        column.className = 'window-column';
        this.content_container.appendChild(column);
        for (let category in categories) {
            let elt = document.createElement('div');
            elt.className = 'column-item';
            elt.innerHTML = category;
            let content = categories[category];
            elt.content = content;
            elt.window = this;
            elt.addEventListener('click', this.replace_content);
            column.appendChild(elt);
            content.style.display = "none";
            this.content_container.appendChild(content);
        }
        return column;
    }
    create_content() {
        let content = document.createElement('div');
        content.className = 'window-content';
        return content;
    }
    create_spoiler(section, content) {
        let status = document.createElement('div');
        section.style.cursor = "pointer";
        status.style.float = "right";
        status.innerHTML = '<';
        status.style.rotate = '-90deg';
        section.appendChild(status);
        section.addEventListener('click', () => {
            if (content.style.display == 'none') {
                content.style.display = 'block';
                status.style.rotate = '-90deg';
            }
            else {
                content.style.display = 'none';
                status.style.rotate = '0deg';
            }
        });
    }
    replace_content() {
        let current_category = this.window.get_window().getElementsByClassName('column-item active')[0];
        if (current_category) {
            current_category.classList.remove('active');
            let current_content = current_category.content;
            if (current_content)
                current_content.style.display = "none";
        }
        this.content.style.display = "block";
        this.classList.add("active");
    }
    get_window() {
        return this.window;
    }
    get_container() {
        return this.content_container;
    }
    set_title(title) {
        this.title.innerHTML = title;
    }
    go_front(window) {
        let n = DraggableWindow.DRAG_WINDOWS.length - 1;
        let last = DraggableWindow.DRAG_WINDOWS[n];
        if (last != window) {
            let idx = DraggableWindow.DRAG_WINDOWS.indexOf(window);
            for (let i = idx; i < n; i++) {
                DraggableWindow.DRAG_WINDOWS[i] = DraggableWindow.DRAG_WINDOWS[i + 1];
                DraggableWindow.DRAG_WINDOWS[i].style.zIndex = `${100 + i}`;
            }
            DraggableWindow.DRAG_WINDOWS[n] = window;
            DraggableWindow.DRAG_WINDOWS[n].style.zIndex = `${100 + n}`;
        }
    }
    close_window() {
        this.window.style.visibility = "hidden";
    }
    show_window() {
        this.window.style.visibility = "visible";
        this.go_front(this.window);
        let pos = window_pos_check(this.window);
        this.window.style.left = pos[0] + "px";
        this.window.style.top = pos[1] + "px";
    }
    toggle_window() {
        if (this.window.style.visibility == "hidden")
            this.show_window();
        else
            this.close_window();
    }
}
DraggableWindow.DRAG_WINDOWS = [];
function drag_start(ev) {
    if (!('titlebar' in this) || !('window' in this))
        return;
    if (ev.target != this && ev.target != this.titlebar)
        return;
    ev.preventDefault();
    document.addEventListener("mouseup", drag_end);
    document.addEventListener("mousemove", drag);
    let window = this.window;
    POPUP_ELEMENT.window = window;
    POPUP_ELEMENT.pos = [window.offsetLeft, window.offsetTop];
    POPUP_ELEMENT.cursor = [MOUSE_POS.x, MOUSE_POS.y];
}
function drag(e) {
    let popup = POPUP_ELEMENT;
    if (!popup.window)
        return;
    let delta_x = MOUSE_POS.x - popup.cursor[0];
    let delta_y = MOUSE_POS.y - popup.cursor[1];
    let left = popup.pos[0] + delta_x;
    let top = popup.pos[1] + delta_y;
    let pos = window_pos_check(popup.window, left, top);
    left = pos[0];
    top = pos[1];
    popup.window.style.left = left + "px";
    popup.window.style.top = top + "px";
}
function window_pos_check(window, left, top) {
    if (!left)
        left = parseInt(window.style.left);
    if (!top)
        top = parseInt(window.style.top);
    let width = 100;
    let max_width = document.body.offsetWidth;
    let height = 100;
    let max_height = document.body.offsetHeight;
    if (left + width > max_width)
        left = max_width - width;
    else if (left + window.offsetWidth < width)
        left = 100 - window.offsetWidth;
    if (top + height > max_height)
        top = max_height - height;
    else if (top < 0)
        top = 0;
    return [left, top];
}
function drag_end() {
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", drag_end);
}
