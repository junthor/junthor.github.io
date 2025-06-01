export class DocumentSaver {
    constructor(editor, stylist) {
        this.editor = editor;
        this.stylist = stylist;
        this.reader = new FileReader();
    }
    save() {
        let title = this.stylist.get_document_title();
        let data = {
            content: this.editor.get_text(),
            css: this.editor.get_css(),
            macros: this.editor.get_custom_macros(),
            title: title,
            style: {
                template: this.stylist.get_templates(),
                keyword: this.stylist.get_keyword(),
                style: this.stylist.get_style()
            }
        };
        let json = JSON.stringify(data);
        let a = document.createElement("a");
        let file = new Blob([json], { type: "text/plain;charset=utf-8" });
        a.href = URL.createObjectURL(file);
        a.download = `${title.replaceAll(' ', '_').toLowerCase()}.curator`;
        a.click();
    }
    load(file) {
        this.reader.readAsText(file);
        this.reader.onload = () => this.apply_json(this.reader.result);
    }
    apply_json(data) {
        if (data instanceof ArrayBuffer)
            return;
        if (data == null)
            return;
        this.apply_data(JSON.parse(data));
    }
    apply_data(data) {
        if (data['css'])
            this.editor.set_css(data['css']);
        if (data['macros'])
            this.editor.set_macros(data['macros']);
        if (data['style'])
            this.stylist.apply(data['style'], true);
        if (data['content'])
            this.editor.set_text(data['content']);
        if (data['title'])
            this.stylist.set_document_title(data['title']);
    }
}
