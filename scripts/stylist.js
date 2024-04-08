class Stylist {

    #styles
    #color_picker
    #variables

    constructor(style = DEFAULT_STYLE){
        this.#styles = style

        this.#variables = {
            'Colors': {
                'Title Underline': '--primary-color',
            },
            'Font': {
                'Text': '--text-color',
                'Heading': '--heading-color',
                'Table Text': '--table-text-color',
                'Table Heading': '--table-heading-color',
            },
            'Backgrounds': {
                'Description': '--description-color',
                'Note': '--note-color',
                'Table Row (Even)': '--table-color',
                'Table Row (Odd)': '--secondary-color',
            }
        }

        document.body.appendChild(this.create_color_picker())
    }

    create_color_picker(){
        let popup = new Popup()
        popup.get_window().id = 'color-picker-container'
        popup.set_title('<i class="bi bi-palette2"></i> Color Picker')
        this.#color_picker = popup.get_content()
        this.#color_picker.id = 'color-picker'

        for(const category in this.#variables){
            let category_container = document.createElement('div')
            category_container.className = "category"
            category_container.innerHTML = `<div class='category-name'>${category}</div>`
            for(let [text, id] of Object.entries(this.#variables[category])) {
                let value = this.#styles[':root'][id]
                let container = document.createElement('div')
                container.className = 'color-container full'

                let picker = document.createElement('input')
                picker.type = 'text'
                picker.className = 'color-selector'
                picker.id = id
                picker.value = value
                picker.setAttribute('data-coloris', '')
                picker.addEventListener('input', this.#change_color)

                let name = document.createElement('div')
                name.className = 'color-name'
                name.innerText = text

                let value_div = document.createElement('div')
                value_div.className = 'color-value'
                value_div.innerText = value

                picker.stylist = this
                picker.value_div = value_div

                container.appendChild(value_div)
                container.appendChild(picker)
                container.appendChild(name)

                category_container.appendChild(container)
            }
            this.#color_picker.appendChild(category_container)
        }

        return popup.get_window()
    }

    change_root_color(color, value){
        this.#styles[':root'][color] = value
        this.hot_load()
    }

    #change_color(){
        this.stylist.change_root_color(this.id, this.value)
        this.value_div.innerHTML = this.value
    }

    get_style(){
        return this.#styles
    }

    apply_style(style){
        this.#styles = style
        for(const category in this.#variables) {
            for(let [name, color] of Object.entries(this.#variables[category])) {
                let picker = document.getElementById(color)
                picker.value = this.#styles[':root'][color]
                picker.value_div.innerHTML = picker.value
                picker.parentElement.style.color = picker.value
            }
        }
        this.hot_load()
    }

    merge_style(style){
        for(let [key, properties] of Object.entries(style)) {
            for(let [property, value] of Object.entries(properties)) {
                this.#styles[key][property] = value
            }
        }
    }

    to_css(){
        let css = []
        
        for(let [key, properties] of Object.entries(this.#styles)) {
            let style = [key + ' {']
            for(let [property, value] of Object.entries(properties)) {
                style.push('\t' + property + ": " + value + ";")
            }
            css.push(style.join('\n') + '}\n')    
        }

        return '<style>\n'+css.join('')+'</style>\n'
    }

    hot_load(){
        let css = this.to_css()
        document.getElementById('quick-style').innerHTML = css
        return css
    }
}