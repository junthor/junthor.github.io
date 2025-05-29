import { BBCODE_TAGS, BBCODE_TAGS_STATIC } from "../config/tags.js";
// @ts-ignore Import module
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
const SEPARATOR = {
    style: ";",
    class: " ",
};
export class EditorParser {
    constructor(tags = BBCODE_TAGS, static_tags = BBCODE_TAGS_STATIC) {
        this.COMPLEX_TAGS = tags;
        this.SIMPLE_TAGS = static_tags;
        this.TOC = [];
        const renderer = {
            listitem(token) {
                // console.log(token)
                let text;
                if (token.tokens.length > 1) {
                    // @ts-ignore
                    text = this.parser.parse([token.tokens[1]]);
                    // @ts-ignore
                    text = this.parser.parseInline([token.tokens[0]]) + text;
                }
                else {
                    // @ts-ignore
                    text = this.parser.parseInline(token.tokens);
                }
                // console.log(text)
                // ToC
                if (text.includes('::')) {
                    text = text.split('::', 2);
                    let h = text[0];
                    text = text[1].split('<ul>');
                    let p = parseInt(text[0].trim());
                    text[0] = `<span class='toc-page'>${p}</span></a>`;
                    text = text.join('<ul>');
                    text = `<a class="toc-entry" href="#page${p - 1}"><span class='toc-heading'>${h}</span>${text}`;
                }
                return `<li class='toc-li'>${text}</li>\n`;
            },
            paragraph(token) {
                // @ts-ignore
                let text = this.parser.parseInline(token.tokens);
                if (text.includes("::")) {
                    text = text.split("\n");
                    let res = [];
                    let dl = [];
                    for (const txt of text) {
                        if (txt.includes("::"))
                            dl.push(txt);
                        else {
                            if (dl.length > 0) {
                                let list = "<dl>";
                                for (const desc of dl) {
                                    let sep = desc.search('::');
                                    list += `<div><dt>${desc.substring(0, sep)}</dt><dd>${desc.substring(sep + 2)}</dd></div>`;
                                }
                                res.push(list + '</dl>');
                                dl = [];
                            }
                            res.push(`<p>${txt}</p>`);
                        }
                    }
                    if (dl.length > 0) {
                        let list = "<dl>";
                        for (let desc of dl) {
                            let sep = desc.search('::');
                            list += `<div><dt>${desc.substring(0, sep)}</dt><dd>${desc.substring(sep + 2)}</dd></div>`;
                        }
                        res.push(list + '</dl>');
                    }
                    return res.join("\n");
                }
                return `<p>${text}</p>\n`;
            }
        };
        const extension = {
            useNewRenderer: true,
            renderer: renderer
        };
        marked.use(extension);
    }
    get_toc() {
        return this.TOC;
    }
    parse_markdown_inline(text) {
        return marked.parseInline(text);
    }
    parse_markdown(text) {
        return marked.parse(text);
    }
    parse_headings(text, TOC) {
        let res = '';
        let inside = 0;
        let s = 0;
        let acceptable = true;
        for (let i = 0; i < text.length; i++) {
            if (text[i] == '`') {
                let cpt = 1;
                while (text[++i] == '`')
                    cpt++;
                if (inside > 0 && cpt >= inside)
                    inside = 0;
                else if (inside == 0)
                    inside = cpt;
            }
            else if (inside == 1 && text[i] == '\n')
                inside = 0;
            if (inside > 0)
                continue;
            if (text[i] == '\n') {
                acceptable = true;
                continue;
            }
            if (!acceptable)
                continue;
            if (text[i] == '#') {
                let offset = i;
                while (i + 1 < text.length && text[i + 1] == '#')
                    i++;
                let level = i - offset + 1;
                if (text[i + 1] != ' ')
                    break;
                while (i + 1 < text.length && text[i + 1] != '\n')
                    i++;
                let txt = text.substring(offset + level + 1, i + 1).trim();
                txt = this.parse_markdown_inline(txt);
                // TOC
                if (txt.includes('[*]')) {
                    txt = txt.replace('[*]', '').trim();
                }
                else if (level <= 3)
                    TOC.push([level, txt]);
                res += text.substring(s, offset);
                res += `<h${level} onclick='editor.focus_page(this, ${offset + level + 1})'>${txt}</h${level}>\n`;
                s = i + 1;
            }
            else if (text[i] != ' ' || text[i] != '>')
                acceptable = false;
        }
        return res + text.substring(s);
    }
    parse_supscript(text) {
        let res = '';
        let open = 0;
        let close = 0;
        let s = 0;
        let inside = 0;
        for (let i = 0; i < text.length; i++) {
            if (text[i] == '`') {
                let cpt = 1;
                while (text[++i] == '`')
                    cpt++;
                if (inside > 0 && cpt >= inside)
                    inside = 0;
                else if (inside == 0)
                    inside = cpt;
            }
            else if (inside == 1 && text[i] == '\n')
                inside = 0;
            if (inside > 0)
                continue;
            // Lookahead
            if (text[i] == '^' || text[i] == '_') {
                if (text[i + 1] == '{') {
                    res += text.substring(s, i);
                    s = i + 2;
                    open = 1;
                    close = 0;
                    while (s < text.length) {
                        if ((text[s] == '^' || text[s] == '_') && text[s + 1] == '{')
                            open++;
                        if (text[s] == '}')
                            close++;
                        if (open == close)
                            break;
                        s++;
                    }
                    let script = text.substring(i + 2, s);
                    if (open > 1)
                        script = this.parse_supscript(script);
                    if (s >= text.length)
                        res += script;
                    else if (text[i] == '^')
                        res += `<sup>${script}</sup>`;
                    else
                        res += `<sub>${script}</sub>`;
                    i = s;
                    s = s + 1;
                }
            }
        }
        res += text.substring(s);
        return res;
    }
    parse(text, page = 0, start = 0, offset = 0, substitutions) {
        let texts = text.split("[newpage]");
        for (let i = start; i < texts.length - offset; i++) {
            const TOC = [];
            // Parse Heading Because of (1) TOC and (2) Find on Editor 
            texts[i] = this.parse_headings(texts[i], TOC);
            texts[i] = texts[i].replaceAll(/^(:*\s*):(\s*\n+)(\-)?/gm, function (match, g1, g2, g3) {
                if (g1 !== g2)
                    g1 = g1.replaceAll(/\s/g, '');
                console.log(match);
                if (g3 != null && g3 != "") {
                    return '\n<br>\n'.repeat(g1.length + 1) + g2 + g3;
                }
                return '<br>'.repeat(g1.length + 1) + g2;
            });
            if (substitutions) {
                for (let s in substitutions) {
                    let sub = substitutions[s];
                    let value = sub[0] ? sub[2] : sub[1];
                    let regex = new RegExp(`${sub[1].replaceAll(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&')}`, 'g');
                    texts[i] = texts[i].replaceAll(regex, `<span class='substitute-${s}'>${value}</span>`);
                }
            }
            this.TOC[page + i - start] = TOC;
            // Special case for sub and sup tags
            // Using the LaTeX syntax ^{...}
            texts[i] = this.parse_supscript(texts[i]);
            texts[i] = this.parse_tags(texts[i]);
            texts[i] = this.parse_markdown(texts[i]);
        }
        return texts;
    }
    /**
     * Transform a matrix into an HTML table
     * @param {*} table
     */
    render_table(table, spans, mode) {
        let align = [];
        for (let i = 0; i < mode.length; i++) {
            let style = [];
            if (mode[i] == 'c')
                style.push('align="center"');
            else if (mode[i] == 'l')
                style.push('align="left"');
            else if (mode[i] == 'r')
                style.push('align="right"');
            else
                style.push('');
            if (i + 1 >= mode.length) {
                align.push(style.join(' '));
                break;
            }
            if (mode[i + 1] == '^') {
                style.push('style="vertical-align:baseline"');
                i++;
            }
            else if (mode[i + 1] == '_') {
                style.push('style="vertical-align:bottom"');
                i++;
            }
            else if (mode[i + 1] == '-') {
                style.push('style="vertical-align:middle"');
                i++;
            }
            align.push(style.join(' '));
        }
        let n = align.length;
        let html = '<table><thead><tr>';
        for (let i = 0; i < n; i++) {
            html += `<th ${align[i]}>${table[0][i]}</th>`;
        }
        html += '</tr><tbody>';
        for (let row = 1; row < table.length; row++) {
            html += '<tr>';
            for (let i = 0; i < table[row].length; i++) {
                let span = '';
                if (spans[row][i]) {
                    if (spans[row][i][0] > 1)
                        span += `colspan="${spans[row][i][0]}" `;
                    if (spans[row][i][1] && spans[row][i][1] > 1)
                        span += `rowspan="${spans[row][i][1]}" `;
                }
                html += `<td ${span}${align[i]}>${table[row][i]}</td>`;
            }
            html += '</tr>';
        }
        html += '</tbody></table>';
        return html;
    }
    /**
     * Parse a table according to a semi LaTeX syntax
     * @param {*} text
     * @param {*} decomposition
     * @param {*} start
     * @param {*} result
     */
    parse_table(text, decomposition, start, result) {
        let i = start;
        let mode = undefined;
        if (decomposition.mode)
            mode = decomposition.mode.replaceAll(' ', '');
        let table = [[]];
        let spans = [[]];
        let tag = false;
        let cell_start = i;
        let current_row = 0;
        while (i < text.length) {
            // The end of the cell
            if (text[i] == '|' && text[i - 1] != '\\') {
                let cell_content = text.substring(cell_start, i).trim();
                cell_content = cell_content.replaceAll('\\|', '|');
                let span = cell_content.match(/{(\d)(?:,\s*(\d))?}$/);
                if (span) {
                    let colspan = span[1] ? parseInt(span[1]) : 1;
                    let rowspan = span[2] ? parseInt(span[2]) : 1;
                    spans[current_row].push([colspan, rowspan]);
                    cell_content = cell_content.substring(0, cell_content.length - span[0].length);
                }
                else
                    spans[current_row].push([1, 1]);
                if (tag)
                    cell_content = this.parse_tags(cell_content);
                tag = false;
                cell_content = this.parse_markdown(cell_content);
                table[current_row].push(cell_content);
                cell_start = i + 1;
            }
            // New row '\\'
            if (text[i] == '\\' && text[i - 1] == '\\') {
                let cell_content = text.substring(cell_start, i - 1).trim();
                let span = cell_content.match(/{(\d)(?:,\s*(\d))?}$/);
                if (span) {
                    let colspan = span[1] ? parseInt(span[1]) : 1;
                    let rowspan = span[2] ? parseInt(span[2]) : 1;
                    spans[current_row].push([colspan, rowspan]);
                    cell_content = cell_content.substring(0, cell_content.length - span[0].length);
                }
                else
                    spans[current_row].push([1, 1]);
                if (tag)
                    cell_content = this.parse_tags(cell_content);
                tag = false;
                cell_content = this.parse_markdown(cell_content);
                table[current_row].push(cell_content);
                cell_start = i + 1;
                current_row++;
                table.push([]);
                spans.push([]);
            }
            // Check end
            if (text[i] == '[') {
                if (i + 6 < text.length && text.substring(i, i + 8) == '[/table]') {
                    let cell_content = text.substring(cell_start, i).trim();
                    if (tag)
                        cell_content = this.parse_tags(cell_content);
                    cell_content = this.parse_markdown(cell_content);
                    table[current_row].push(cell_content);
                    if (!mode) {
                        let max = 0;
                        for (let row of table)
                            max = max < row.length ? row.length : max;
                        mode = 'x'.repeat(max);
                    }
                    result.push(this.render_table(table, spans, mode));
                    return i + 8;
                }
                else
                    tag = true;
            }
            i++;
        }
        return start;
    }
    simple_parse(text) {
        text = this.parse_tags(text);
        return this.parse_markdown(text);
    }
    tag_decompose(tag) {
        // [...]
        let i = 1;
        let start = 1;
        let inside;
        let key;
        let value;
        let keywords = [];
        while (i < tag.length && tag[i] != " " && tag[i] != "]")
            i++;
        let name = tag.substring(start, i);
        let decomposition = { name: name };
        i++;
        start = i;
        while (++i < tag.length) {
            let c = tag[i];
            if (inside) {
                if (c == inside)
                    inside = undefined;
                continue;
            }
            if (c == '"' || c == "'") {
                inside = c;
                continue;
            }
            if (c == " " || c == "]") {
                if (tag[start] == '"' || tag[start] == "'")
                    value = tag.substring(start + 1, i - 1);
                else
                    value = tag.substring(start, i);
                value = value.trim();
                if (key) {
                    decomposition[key.trim()] = value;
                    key = undefined;
                }
                else if (value != '') {
                    decomposition[value] = undefined;
                    keywords.push(value);
                }
                start = i + 1;
                continue;
            }
            if (c == "=") {
                key = tag.substring(start, i);
                start = i + 1;
            }
        }
        // If it's a complex tag, check if there are exclusions
        let complex = this.COMPLEX_TAGS[name];
        if (complex && complex.exclusive_keywords) {
            let exclusions = complex.exclusive_keywords;
            let found;
            for (let groups of exclusions) {
                let kws = groups.keywords;
                // Check the keywords found against the kws in the exclusive field
                for (let i = 0; i < keywords.length; i++) {
                    for (let j = 0; j < kws.length; j++) {
                        // If we found one, we remove the other
                        if (kws[j] == keywords[i] && kws[j] != found) {
                            if (found)
                                delete decomposition[kws[j]];
                            else
                                found = kws[j];
                        }
                    }
                }
                // Add the default keywords if we did not find any
                if (!found && groups.default)
                    decomposition[groups.default] = undefined;
            }
        }
        return decomposition;
    }
    parse_tags(text) {
        // We consider all tags to be surrounded by "[" and "]"
        let start = 0;
        let result = [];
        let c;
        let inside = 0;
        for (let i = 0; i < text.length; i++) {
            c = text[i];
            if (c == '`') {
                let cpt = 1;
                while (text[++i] == '`')
                    cpt++;
                if (inside > 0 && cpt >= inside)
                    inside = 0;
                else if (inside == 0)
                    inside = cpt;
            }
            else if (inside == 1 && text[i] == '\n')
                inside = 0;
            if (inside > 0)
                continue;
            else if (c == "[" && inside == 0) {
                result.push(text.substring(start, i)); // We copy the string between two tags
                start = i;
            }
            else if (c == "]" && inside == 0) {
                start = this.tag_replace(text, start, i + 1, result);
                i = start;
            }
        }
        result.push(text.substring(start));
        return result.join("");
    }
    tag_replace(text, start, end, result) {
        let tag = text.substring(start, end);
        let code;
        // The tag is a simple tag, replace and that's it
        if ((code = this.SIMPLE_TAGS[tag])) {
            result.push(code);
            return end;
        }
        // If the tag is complex, need we need further computation
        let decomposition = this.tag_decompose(tag);
        // Closing Tag
        if (decomposition['name'].startsWith('/')) {
            let syntax = this.COMPLEX_TAGS[decomposition["name"].substring(1)];
            // Not a supported tag
            if (!syntax) {
                // TODO: Sould it create a div with class = name + keywords?
                result.push(tag);
                return end;
            }
            code = `</${syntax['tag']}>`;
            if (syntax['add_end'])
                code = syntax['add_end'] + code;
            result.push(code);
            return end;
        }
        let syntax = this.COMPLEX_TAGS[decomposition["name"]];
        // Not a supported tag
        if (!syntax) {
            // Check for table (special cases)
            if (decomposition.name == 'table') {
                return this.parse_table(text, decomposition, end, result);
            }
            result.push(tag);
            return end;
        }
        if (syntax["alias"])
            syntax = this.COMPLEX_TAGS[syntax["alias"]];
        // If the tag is a simple tag with parameters
        // (does not require the content of the tag)
        if (!syntax["full_tag"]) {
            // Check if the tag can be parsed using regex
            if (syntax["regex"]) {
                let content = tag;
                for (let [key, val] of Object.entries(syntax["regex"])) {
                    content = content.replace(val, key);
                }
                result.push(content);
                return end;
            }
            // Will contains all parameters once parsing is done
            let html_param = {};
            // If the tag has auto parameters (class or style primarly)
            if (syntax["auto_params"]) {
                for (let [key, val] of Object.entries(syntax["auto_params"])) {
                    if (!html_param[key])
                        html_param[key] = [val];
                    else
                        html_param[key].push(val);
                }
            }
            // Checking the options of the tag found in the decomposition
            for (let key in decomposition) {
                let value = decomposition[key];
                // An option is a keyword if it has no value attached to it
                if (syntax["keywords"] && key && !value) {
                    let kw = syntax["keywords"][key];
                    if (kw) {
                        // Accepted keyword
                        if (!html_param[kw[0]])
                            html_param[kw[0]] = [];
                        html_param[kw[0]].push(kw[1]);
                    }
                    else if (key.startsWith("#")) {
                        // Anchor
                        html_param["id"] = [key.substring(1)];
                    } // TODO: TESTING AUTO CLASS FOR KEYWORDS
                    else {
                        if (!html_param['class'])
                            html_param['class'] = [];
                        html_param['class'].push(key);
                    }
                    continue;
                }
                let parameter;
                if (syntax["params"])
                    parameter = syntax["params"][key];
                // If the parameter is acceptable, i.e there is an entry for it
                if (parameter) {
                    let regex = parameter[2];
                    if (value && regex.test(value)) {
                        if (!html_param[parameter[0]])
                            html_param[parameter[0]] = [];
                        let end = "";
                        if (parameter[3])
                            end = parameter[3];
                        html_param[parameter[0]].push(parameter[1] + value + end);
                    }
                }
            }
            // adds if the string that will contains style="..." class="..." etc...
            let adds = " ";
            for (let [key, val] of Object.entries(html_param)) {
                // check the separator for the given type
                // ex: styles are separated by ";" while classnames are separated by " "
                let sep = SEPARATOR[key];
                if (!sep)
                    sep = "";
                adds += key + '="' + val.join(sep) + '" ';
            }
            let closing;
            if (syntax["self_closing"])
                closing = "/>";
            else
                closing = ">";
            code = "<" + syntax["tag"] + adds + closing;
            if (syntax["add_start"])
                code += syntax["add_start"];
            result.push(code);
            return end;
        }
        // The tag requires the content inside it
        // We therefore need to find the closing corresponding tag
        let i = end - 1;
        let content = [];
        let inside = 0;
        while (i++ < text.length) {
            if (text[i] == '`') {
                let cpt = 1;
                while (text[++i] == '`')
                    cpt++;
                if (inside > 0 && cpt >= inside)
                    inside = 0;
                else if (inside == 0)
                    inside = cpt;
            }
            else if (inside == 1 && text[i] == '\n')
                inside = 0;
            if (inside > 0)
                continue;
            // Found potential tag
            if (text[i] == "[") {
                let close = i + 1;
                while (close < text.length && text[close] != "]")
                    close++;
                let close_tag = text.substring(i + 2, close);
                // If it's not the corresponding closing tag
                if (text[i + 1] != "/" || close_tag != decomposition["name"]) {
                    if (end != i)
                        content.push(text.substring(end, i));
                    end = this.tag_replace(text, i, close + 1, content);
                    i = end;
                }
                else {
                    // If it's the corresponding closing tag
                    content.push(text.substring(end, i));
                    let str = content.join("");
                    str = tag + str + "[/" + close_tag + "]";
                    // Complex tag are treated using a regex, always
                    for (let key in syntax["regex"]) {
                        str = str.replace(syntax["regex"][key], key);
                    }
                    result.push(str);
                    return close + 1;
                }
            }
        }
        // If we are here we did not found the closing tag
        content.push(text.substring(end, i));
        let str = content.join("");
        str = tag + str;
        result.push(str);
        return i;
    }
}
