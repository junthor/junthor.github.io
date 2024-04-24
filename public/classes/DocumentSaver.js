export class DocumentSaver {
    constructor(editor, stylist) {
        this.editor = editor;
        this.stylist = stylist;
        this.reader = new FileReader();
    }
    save() {
        let data = {
            content: this.editor.get_text(),
            css: this.editor.get_css(),
            style: {
                template: this.stylist.get_templates(),
                style: this.stylist.get_style()
            }
        };
        let json = JSON.stringify(data);
        let a = document.createElement("a");
        let file = new Blob([json], { type: "text/plain;charset=utf-8" });
        a.href = URL.createObjectURL(file);
        a.download = "document.curator";
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
        if (data['content'])
            this.editor.set_text(data['content']);
        if (data['style'])
            this.stylist.apply(data['style'], true);
    }
}
