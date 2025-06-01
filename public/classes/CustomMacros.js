export class CustomMacro {
    constructor(content) {
        this.content = content;
    }
    static compare(a, b) {
        if (a.content < b.content)
            return -1;
        if (a.content > b.content)
            return 1;
        return 0;
    }
    static get_all_changes(a, b) {
        let changes = [];
        for (let key in a) {
            if (!(key in b))
                changes.push(key);
            else if (CustomMacro.compare(a[key], b[key]) !== 0)
                changes.push(key);
        }
        for (let key in b) {
            if (!(key in a))
                changes.push(key);
        }
        return changes;
    }
    static parse(text) {
        let macros = {};
        const regex = /\[macro ([^\]]+)\]([\s\S]*?)\[\/macro\]/g;
        let match;
        while ((match = regex.exec(text)) !== null) {
            const name = match[1].trim();
            const content = match[2].trim();
            macros[name] = new CustomMacro(content);
        }
        return macros;
    }
    getContent() {
        return this.content;
    }
}
export class CustomTemplate {
    constructor(content) {
        this.content = content;
    }
    static parse(text) {
        let templates = {};
        const regex = /\[template ([^\]]+)\]([\s\S]*?)\[\/template\]/g;
        let match;
        while ((match = regex.exec(text)) !== null) {
            const name = match[1].trim();
            const content = match[2].trim();
            templates[name] = new CustomTemplate(content);
        }
        return templates;
    }
    getContent() {
        return this.content;
    }
}
