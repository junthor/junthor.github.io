class DocumentSaver {

    #editor
    #stylist
    #reader

    constructor(editor, stylist){
        this.#editor = editor;
        this.#stylist = stylist;
        this.#reader = new FileReader()
    }

    save() {
        let data = {}
        data['content'] = this.#editor.get_text()
        data['style'] = this.#stylist.get_style()
        let json = JSON.stringify(data)
        console.log(json)
        let a = document.createElement("a");
        let file = new Blob([json], {type: "text/plain;charset=utf-8"});
        a.href = URL.createObjectURL(file);
        a.download = "document.curator";
        a.click()
    }

    load(file){
        this.#reader.readAsText(file)
        this.#reader.onload = e => this.#apply_data(this.#reader.result)
    }

    #apply_data(data){
        this.apply_data(JSON.parse(data))
    }

    apply_data(data) {
        this.#editor.set_text(data['content'])
        this.#stylist.apply_style(data['style'])
    }
}