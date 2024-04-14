class Popup {

    #window
    #title
    #content

    constructor(element = 'div') {
        this.#window = document.createElement(element)
        this.#window.drag = this.drag
        this.#window.drag_end = this.drag_end
        this.#window.className = 'window-popup'

        this.#window.style.visibility = "hidden"

        // Header (title + close)
        let header = document.createElement('div')
        header.className = 'window-header'
        this.#title = document.createElement('div')
        this.#title.className = 'window-title'
        header.appendChild(this.#title)
        header.addEventListener('mousedown', this.drag_start)
        header.window = this.#window
        header.title = this.#title

        let close_button = document.createElement('div')
        close_button.className = "close-button"
        close_button.addEventListener('click', this.close_window)
        close_button.innerHTML = '<i class="bi bi-x"></i>'
        close_button.window = this.#window
        header.appendChild(close_button)


        this.#content = document.createElement('div')

        this.#window.appendChild(header)
        this.#window.appendChild(this.#content)
    }

    get_window(){
        return this.#window
    }

    get_content(){
        return this.#content
    }

    set_title(title){
        this.#title.innerHTML = title
    }

    close_window(){
        this.window.style.visibility = "hidden"
    }

    show_window(){
        this.window.style.visibility = "visible"
    }

    toggle_window(){
        if(this.window.style.visibility == "hidden") this.show_window()
        else this.close_window()
    }

    drag_start(e) {
        if (e.target != this && e.target != this.title) return
        e.preventDefault()
        document.addEventListener('mouseup', this.window.drag_end)
        document.addEventListener('mousemove', this.window.drag)
        document.popup_drag_element = this.window

        this.window.pos = [this.window.offsetLeft, this.window.offsetTop]
        this.window.cursor = [MOUSE_POS.x, MOUSE_POS.y]
    }

    drag(e) {
        let popup = this.popup_drag_element
        let delta_x = MOUSE_POS.x - popup.cursor[0]
        let delta_y = MOUSE_POS.y - popup.cursor[1]

        popup.style.left = popup.pos[0] + delta_x + "px"
        popup.style.top = popup.pos[1] + delta_y + "px"
    }

    drag_end(e){
        this.removeEventListener('mousemove', this.popup_drag_element.drag)
        this.removeEventListener('mouseup', this.popup_drag_element.drag_end)
    }

}