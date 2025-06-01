export class CustomSnippet {
    constructor(text) {
        this.text = text;
    }
    static parse(text) {
        let snippets = {};
        const regex = /\[snippet ([^\]]+)\]([\s\S]*?)\[\/snippet\]/g;
        let match;
        while ((match = regex.exec(text)) !== null) {
            const name = match[1].trim();
            const snippetText = match[2].trim();
            snippets[name] = new CustomSnippet(snippetText);
        }
        return snippets;
    }
    getText() {
        return this.text;
    }
}
export class CustomTemplate {
    constructor(text) {
        this.text = text;
    }
    static parse(text) {
        let templates = {};
        const regex = /\[template ([^\]]+)\]([\s\S]*?)\[\/template\]/g;
        let match;
        while ((match = regex.exec(text)) !== null) {
            const name = match[1].trim();
            const templateText = match[2].trim();
            templates[name] = new CustomTemplate(templateText);
        }
        return templates;
    }
    getText() {
        return this.text;
    }
}
