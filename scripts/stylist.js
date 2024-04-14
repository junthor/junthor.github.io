class Stylist {

    #styles
    #color_picker
    #text_barber
    #color_variables
    #font_variables
    #snippets

    constructor(style = DEFAULT_STYLE){
        this.#styles = style

        // Triggers the margin
        this.#apply_lettrine_properties(this.#styles[':root']['--lettrine-font'])

        this.#color_variables = COLOR_PICKER_VARIABLES
        this.#font_variables = FONT_BARBER_VARIABLES
        this.#snippets = SNIPPETS

        document.body.appendChild(this.create_color_picker())
        document.body.appendChild(this.create_text_customizer())
        document.body.appendChild(this.create_snippets_selector())
    }

    create_snippets_selector(){
        let popup = new Popup()
        
        popup.get_window().id = 'snippets-selector-container'
        popup.set_title('<i class="fa-solid fa-wand-magic-sparkles"></i> Snippets Sailor')

        let snippets_selector = popup.get_content()
        snippets_selector.className = "snippets-selector"

        let snippets_container = document.createElement('div')
        snippets_container.className = 'snippets-container'
        let column_category = document.createElement('div')
        column_category.className = 'column-category'
        let snippets_content = document.createElement('div')
        snippets_content.className = 'snippets-content'
        snippets_content.id = 'snippets-content'
        let page_preview = document.createElement('div')
        page_preview.className = 'page-preview'
        let block_preview = document.createElement('div')
        block_preview.className = 'block-preview'
        let mini_page = document.createElement('div')
        mini_page.className = 'mini-page'
        page_preview.appendChild(mini_page)

        snippets_selector.appendChild(snippets_container)
        snippets_selector.appendChild(page_preview)
        snippets_selector.appendChild(block_preview)

        snippets_container.appendChild(column_category)
        snippets_container.appendChild(snippets_content)

        for(const category in this.#snippets) {
            let elt = document.createElement('div')
            elt.className = 'snippet-category'
            elt.innerHTML = category
            column_category.appendChild(elt)

            const content = document.createElement('div')
            content.className = 'snippets-content'
            content.innerHTML = `<div class="snippet-category-name">${category}</div>`
            const item_display = document.createElement('div')
            item_display.style.columns = 2
            item_display.style.padding = "8px"
            content.appendChild(item_display)
            for(const i in this.#snippets[category]) {
                let item = this.#snippets[category][i]
                let item_elt = document.createElement('div')
                item_elt.className = 'item'
                item_elt.innerHTML = item[0]

                if(item.length > 3) item_elt.addEventListener('click', e => this.set_root_value(item[3], item[4]))
                else item_elt.addEventListener('click', e => editor.insert(item[1]))
            
                item_elt.addEventListener('mouseenter', e => {
                    if(item[2] == 'block') {
                        block_preview.innerHTML = editor.simple_parse(item[1])
                        page_preview.style.display = "none"
                        block_preview.style.display = "block"
                    }
                    else {
                        mini_page.innerHTML = editor.simple_parse(item[1])
                        block_preview.style.display = "none"
                        page_preview.style.display = "flex"
                    }
                })
                item_display.appendChild(item_elt)
            }

            elt.addEventListener('click', e => this.replace_snippet_content(content))
        }

        return popup.get_window()
    }

    replace_snippet_content(elt) {
        console.log(elt)
        let content = document.getElementById('snippets-content')
        let parent = content.parentNode
        parent.removeChild(content)
        parent.appendChild(elt)
        elt.id = 'snippets-content'
    }

    create_text_customizer(){
        let popup = new Popup()
        popup.get_window().id = 'text-barber-container'
        popup.set_title('<i class="fa-solid fa-pen-nib"></i> Text Tailor')

        let text_container = popup.get_content()
        text_container.style.position = "relative"


        this.#text_barber = document.createElement('div')
        this.#text_barber.id = 'text-barber'

        let preview_box = document.createElement('div')
        preview_box.className = 'preview-box'

        const max_width = 'calc(100% - 350px)'
        let table = document.createElement("table")
        table.style.tableLayout = "fixed"
        table.innerHTML = `<thead><tr>
            <th style='width:${max_width}'>Element</th>
            <th style='width:200px'>Font Family</th>
            <th style='width:100px'>Size</th>
            <th style='width:50px'>Unit</th>
        </tr></thead>`

        const font_units = `<option value="cm">cm</option>
        <option value="pt">pt</option>
        <option value="px">px</option>
        <option value="em">em</option>
        <option value="rem">rem</option>
        <option value="%">%</option>`
        
        //text_container.appendChild(preview_box)
        text_container.appendChild(this.#text_barber)

        for (const type in this.#font_variables) {
            
            let font_container = document.createElement('div')
            font_container.className = 'text-barber-row'

            let family = document.createElement('select')
            for(const opt in this.#font_variables[type].options) {
                let ff = this.#font_variables[type].options[opt]
                family.innerHTML += `<option value="${ff}">${ff}</option>`
            }
            let var_name = this.#font_variables[type].family
            family.value = this.#styles[':root'][var_name]
            family.id = var_name
            family.stylist = this
            family.addEventListener('change', this.#change_font)

            var_name = this.#font_variables[type].size
            
            let font_size = this.#styles[':root'][var_name]
            let font_unit = font_size.replaceAll(/[\d.]/gi, '')
            font_size = parseFloat(font_size)

            let size = document.createElement('input')
            size.type = 'number'
            size.step = 0.01
            size.value = font_size
            size.id = var_name
            size.name = var_name
            size.addEventListener('input', this.#change_font_size)

            let font_name = document.createElement('div')
            font_name.className = 'font-preview'
            font_name.style.maxWidth = '100%'
            font_name.innerHTML = this.#font_variables[type].preview

            let units = document.createElement('select')
            units.innerHTML = font_units
            units.value = font_unit
            units.name = var_name

            size.font_size = size
            units.font_size = size
            size.unit = units
            units.unit = units
            size.stylist = this
            units.stylist = this
            units.addEventListener('change', this.#change_font_size)

            let row = document.createElement('tr')
            let td_0 = document.createElement("td")
            td_0.appendChild(font_name)
            let td_1 = document.createElement("td")
            td_1.appendChild(family)
            let td_2 = document.createElement("td")
            td_2.appendChild(size)
            let td_3 = document.createElement("td")
            td_3.appendChild(units)

            row.appendChild(td_0)
            row.appendChild(td_1)
            row.appendChild(td_2)
            row.appendChild(td_3)

            table.appendChild(row)
        }

        this.#text_barber.appendChild(table)

        return popup.get_window()
    }

    create_color_picker(){
        let popup = new Popup()
        popup.get_window().id = 'color-picker-container'
        popup.set_title('<i class="fa-solid fa-palette"></i> Color Captain')
        this.#color_picker = popup.get_content()
        this.#color_picker.id = 'color-picker'

        for(const category in this.#color_variables){
            let category_container = document.createElement('div')
            category_container.className = "category"
            category_container.innerHTML = `<div class='category-name'>${category}</div>`
            for(let [text, id] of Object.entries(this.#color_variables[category])) {
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

    set_root_value(key, value) {
        this.#styles[':root'][key] = value
        this.hot_load()
        set_columnbreak(document.getElementsByClassName('column-break'))
    }

    set_page_format(input){
        if (input.value == "Letter") {
            this.#styles[":root"]["--page-width"] = "215.9mm"
            this.#styles[":root"]["--page-height"] = "279.4mm"
        } else {
            // A4 is default
            this.#styles[":root"]["--page-width"] = "210mm"
            this.#styles[":root"]["--page-height"] = "297mm"
        }
        this.hot_load()
        set_columnbreak(document.getElementsByClassName('column-break'))
    }

    #apply_lettrine_properties(font){
        let definition = lettrine_definition[font]
        if(!definition) definition = lettrine_definition['default']

        for(let property in definition) {
            for(let l in definition[property]) {
                let letter = definition[property][l]
                this.#styles[':root'][`--lettrine-letter-${letter}`] = property
            }
        }

        setTimeout(e => this.hot_load(), 100)
    }

    #change_font(){
        if(this.id == '--lettrine-font') this.stylist.#apply_lettrine_properties(this.value)
        this.stylist.set_root_value(this.id, this.value)
    }
    #change_font_size(){
        this.stylist.set_root_value(this.name, this.font_size.value + this.unit.value)
    }

    #change_color(){
        this.stylist.set_root_value(this.id, this.value)
        this.value_div.innerHTML = this.value
    }

    get_style(){
        return this.#styles
    }

    get_font(font, from=':root'){
        if(!this.#styles[from]) return undefined
        return this.#styles[from][font]
    }

    apply_style(style){
        this.#styles = style
        // Load colors
        for(const category in this.#color_variables) {
            for(let [name, color] of Object.entries(this.#color_variables[category])) {
                let picker = document.getElementById(color)
                picker.value = this.#styles[':root'][color]
                picker.value_div.innerHTML = picker.value
                picker.parentElement.style.color = picker.value
            }
        }
        // Load fonts
        for(const font in this.#font_variables) {
            let data = this.#font_variables[font]
            let family = document.getElementById(data.family)
            let size = document.getElementById(data.size)

            let font_size = this.#styles[':root'][data.size]
            let font_unit = font_size.replaceAll(/[\d.]/gi, '')
            font_size = parseFloat(font_size)

            family.value = this.#styles[':root'][data.family]
            size.value = font_size
            size.unit.value = font_unit
        }

        // Triggers the margin
        this.#apply_lettrine_properties(this.#styles[':root']['--lettrine-font'])

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