import { MOUSE_POS } from "../Utils.js";
const POPUP_ELEMENT = {
    window: undefined,
    pos: [0, 0],
    cursor: [0, 0],
};
const DRAG_WINDOWS = [];
function go_front() {
    let n = DRAG_WINDOWS.length - 1;
    let last = DRAG_WINDOWS[n];
    if (last != this) {
        let idx = DRAG_WINDOWS.indexOf(this);
        for (let i = idx; i < n; i++) {
            DRAG_WINDOWS[i] = DRAG_WINDOWS[i + 1];
            DRAG_WINDOWS[i].style.zIndex = `${100 + i}`;
        }
        DRAG_WINDOWS[n] = this;
        DRAG_WINDOWS[n].style.zIndex = `${100 + n}`;
    }
}
export class Popup {
    constructor(element = "div") {
        this.window = document.createElement(element);
        this.window.className = "window-popup";
        this.window.style.visibility = "hidden";
        this.window.addEventListener('mousedown', go_front);
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
        this.content = document.createElement("div");
        this.window.appendChild(header);
        this.window.appendChild(this.content);
        DRAG_WINDOWS.push(this.window);
    }
    get_window() {
        return this.window;
    }
    get_content() {
        return this.content;
    }
    set_title(title) {
        this.title.innerHTML = title;
    }
    close_window() {
        this.window.style.visibility = "hidden";
    }
    show_window() {
        this.window.style.visibility = "visible";
    }
    toggle_window() {
        if (this.window.style.visibility == "hidden")
            this.show_window();
        else
            this.close_window();
    }
}
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
    popup.window.style.left = popup.pos[0] + delta_x + "px";
    popup.window.style.top = popup.pos[1] + delta_y + "px";
}
function drag_end() {
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", drag_end);
}
