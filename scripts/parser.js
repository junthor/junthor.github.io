class BBParser {
  #COMPLEX_TAGS;
  #SIMPLE_TAGS;
  #TOC;

  constructor(tags = BBCODE_TAGS, static_tags = BBCODE_TAGS_STATIC) {
    this.#COMPLEX_TAGS = tags;
    this.#SIMPLE_TAGS = static_tags;

    this.#TOC = []

    marked.Renderer.prototype.listitem = function (text, task, checked) {
      // ToC
      if(text.includes('::')) {
        text = text.split('::', 2)
        let h = text[0]
        console.log(text)
        text = text[1].split('<ul>')
        let p = parseInt(text[0].trim())
        text[0] = `<span class='toc-page'>${p}</span></a>`
        text = text.join('<ul>')
        text = `<a class="toc-entry" href="#page${p-1}"><span class='toc-heading'>${h}</span>${text}`
      }
      return `<li class='toc-li'>${text}</li>\n`
    }

    marked.Renderer.prototype.paragraph = function (text) {
      text = text.replaceAll(/^(:+\n*)+/gm, function(match, n) {
        if(match == text) return '<br>'.repeat(match.length)
        match = match.replaceAll('\n', '')
        return '<br>'.repeat(match.length)
      })
      if (text.includes("::")) {
        text = text.split("\n");
        let res = [];
        let dl = [];
        for (const txt of text) {
          if (txt.includes("::")) dl.push(txt);
          else {
            if (dl.length > 0) {
              let list = "<dl>";
              for (const desc of dl) {
                let sep = desc.search('::')
                list += `<div><dt>${desc.substring(0, sep)}</dt><dd>${desc.substring(sep+2)}</dd></div>`;
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
            let sep = desc.search('::')
            list += `<div><dt>${desc.substring(0, sep)}</dt><dd>${desc.substring(sep+2)}</dd></div>`;
          }
          res.push(list + '</dl>');
        }
        return res.join("\n");
      }
      return `<p>${text}</p>\n`;
    };
  }

  get_toc(){
    return this.#TOC
  }

  #parse_markdown(text) {
    return marked.parse(text);
  }

  #parse_headings(text, TOC) {
    let res = ''
    let inside = 0
    let s = 0
    let acceptable = true
    for(let i = 0; i < text.length; i++) {
      if (text[i] == '`') {
        let cpt = 1
        while(text[++i] == '`') cpt++
        if(inside > 0 && cpt >= inside) inside = false
        else if(inside == 0) inside = cpt
      }
      else if (inside == 1 && text[i] == '\n') inside = 0
      if (inside > 0) continue

      if(text[i] == '\n') { acceptable = true; continue }
      if(!acceptable) continue

      if(text[i] == '#') {
        let offset = i
        while(i+1 < text.length && text[i+1] == '#') i++
        let level = i - offset + 1
        while(i+1 < text.length && text[i+1] != '\n') i++
        let txt = text.substring(offset+level, i+1).trim()
        // TOC
        if (txt.includes('[*]')) {
          txt = txt.replace('[*]', '').trim()
        } else if (level <= 3) TOC.push([level, txt])
        res += text.substring(s, offset)
        res += `<h${level} onclick='editor.focus_page(this, ${offset+level+1})'>${txt}</h${level}>\n`
        s = i+1
      }
      else if(text[i] != ' ' || text[i] != '>') acceptable = false
    }
    return res + text.substring(s)
  }

  #parse_supscript(text){
    let res = ''
    let open = 0
    let close = 0
    let s = 0
    for(let i = 0; i < text.length; i++) {
      // Lookahead
      if(text[i] == '^' || text[i] == '_') {
        if(text[i+1] == '{') {
          res += text.substring(s, i)
          s = i+2
          open = 1
          close = 0
          while(s < text.length) {
            if((text[s] == '^' || text[s] == '_') && text[s+1] == '{') open++
            if(text[s] == '}') close++
            if(open == close) break
            s++
          }
          let script = text.substring(i+2, s)
          if(open > 1) script = this.#parse_supscript(script)
          if(s >= text.length) res += script
          else if(text[i] == '^') res += `<sup>${script}</sup>`
          else res += `<sub>${script}</sub>`
          i = s
          s = s + 1
        }
      }
    }
    res += text.substring(s)
    return res
  }

  parse(text, pages, first_page, start_offset, offset) {

    text = text.split("[newpage]");

    for (let i = start_offset; i < text.length - offset; i++) {
      const TOC = []

      // Parse Heading Because of (1) TOC and (2) Find on Editor 
      text[i] = this.#parse_headings(text[i], TOC)

      this.#TOC[first_page+i-start_offset] = TOC

      // Special case for sub and sup tags
      // Using the LaTeX syntax ^{...}
      text[i] = this.#parse_supscript(text[i])

      text[i] = this.#parse_tags(text[i]);
      text[i] = this.#parse_markdown(text[i]);
    }

    return text;
  }

  /**
   * Transform a matrix into an HTML table
   * @param {*} table 
   */
  #render_table(table, spans, mode) {
    let align = []
    for(let i = 0; i < mode.length; i++) {
      let style = []
      if (mode[i] == 'c') style.push('align="center"')
      else if (mode[i] == 'l') style.push('align="left"')
      else if (mode[i] == 'r') style.push('align="right"')
      else style.push('')

      if (i + 1 >= mode.length) {
        align.push(style.join(' '))
        break
      }
      if (mode[i+1] == '^') {
        style.push('style="vertical-align:baseline"')
        i++
      } else if (mode[i+1] == '_') {
        style.push('style="vertical-align:bottom"')
        i++
      } else if (mode[i+1] == '-') {
        style.push('style="vertical-align:middle"')
        i++
      }
      align.push(style.join(' '))
    }

    let n = align.length
    
    let html = '<table><thead><tr>'
    for(let i = 0; i < n; i++) {
      html += `<th ${align[i]}>${table[0][i]}</th>`
    }
    html += '</tr><tbody>'
    for(let row = 1; row < table.length; row++) {
      html += '<tr>'
      for(let i = 0; i < table[row].length; i++) {
        let span = ''
        if (spans[row][i]) {
          if(spans[row][i][0] > 1) span += `colspan="${spans[row][i][0]}" ` 
          if(spans[row][i][1] && spans[row][i][1] > 1) span += `rowspan="${spans[row][i][1]}" ` 
        }
        html += `<td ${span}${align[i]}>${table[row][i]}</td>`
      }
      html += '</tr>'
    }
    html += '</tbody></table>'
    return html
  }

  /**
   * Parse a table according to a semi LaTeX syntax
   * @param {*} text 
   * @param {*} decomposition 
   * @param {*} start 
   * @param {*} result 
   */
  #parse_table(text, decomposition, start, result) {
    let i = start;
    let mode = undefined
    if (decomposition.mode) mode = decomposition.mode.replaceAll(' ', '')
    let table = [[]]
    let spans = [[]]
    let tag = false
    
    let cell_start = i
    let current_row = 0
    while(i < text.length) {
      // The end of the cell
      if (text[i] == '|' && text[i-1] != '\\') {
        let cell_content = text.substring(cell_start, i).trim()
        cell_content = cell_content.replaceAll('\\|', '|')
        let span = cell_content.match(/{(\d)(?:,\s*(\d))?}$/)
        if(span) {
          let colspan = span[1] ? span[1] : 1
          let rowspan = span[2] ? span[2] : 1
          spans[current_row].push([colspan, rowspan])
          cell_content = cell_content.substring(0, cell_content.length - span[0].length)
        } else spans[current_row].push(undefined)
        if (tag) cell_content = this.#parse_tags(cell_content)
        tag = false

        table[current_row].push(cell_content)
        cell_start = i + 1
      }
      // New row '\\'
      if (text[i] == '\\' && text[i-1] == '\\') {
        let cell_content = text.substring(cell_start, i-1).trim()
        let span = cell_content.match(/{(\d)(?:,\s*(\d))?}$/)
        if(span) {
          let colspan = span[1] ? span[1] : 1
          let rowspan = span[2] ? span[2] : 1
          spans[current_row].push([colspan, rowspan])
          cell_content = cell_content.substring(0, cell_content.length - span[0].length)
        } else spans[current_row].push(undefined)
        if (tag) cell_content = this.#parse_tags(cell_content)
        tag = false

        table[current_row].push(cell_content)
        cell_start = i + 1
        current_row++
        table.push([])
        spans.push([])
      }
      // Check end
      if (text[i] == '[') {
        if (i+6 < text.length && text.substring(i, i+8) == '[/table]') {
          let cell_content = text.substring(cell_start, i).trim()
          if (tag) cell_content = this.#parse_tags(cell_content)
          table[current_row].push(cell_content)
          if(!mode) {
            let max = 0
            for(let row of table) max = max < row.length ? row.length : max
            mode = 'x'.repeat(max)
          }
          result.push(this.#render_table(table, spans, mode))
          return i+8
        } else tag = true
      }
      i++;
    }

    return start
  }

  simple_parse(text) {
    text = this.#parse_tags(text);
    return this.#parse_markdown(text);
  }

  #tag_decompose(tag) {
    // [...]

    let i = 1;
    let start = 1;
    let inside = false;
    let key;
    let value;

    while (i < tag.length && tag[i] != " " && tag[i] != "]") i++;

    let test_decomposition = { name: tag.substring(start, i) };

    i++;
    start = i;

    while (++i < tag.length) {
      let c = tag[i];

      if (inside) {
        if (c == inside) inside = undefined;
        continue;
      }

      if (c == '"' || c == "'") {
        inside = c;
        continue;
      }

      if (c == " " || c == "]") {
        if (tag[start] == '"' || tag[start] == "'")
          value = tag.substring(start + 1, i - 1);
        else value = tag.substring(start, i);
        value = value.trim()
        if (key) {
          test_decomposition[key.trim()] = value;
          key = undefined;
        } else if (value != '') test_decomposition[value] = undefined;
        start = i + 1;
        continue;
      }

      if (c == "=") {
        key = tag.substring(start, i);
        start = i + 1;
      }
    }
    return test_decomposition;
  }

  #parse_tags(text) {
    // We consider all tags to be surrounded by "[" and "]"
    let start = 0;
    let result = [];
    let c;
    let inside = 0;

    for (let i = 0; i < text.length; i++) {
      c = text[i];
      if (c == '`') {
        let cpt = 1
        while(text[++i] == '`') cpt++
        if(inside > 0 && cpt >= inside) inside = false
        else if(inside == 0) inside = cpt
      }
      else if (inside == 1 && text[i] == '\n') inside = 0
      if (inside > 0) continue

      else if (c == "[" && inside == 0) {
        result.push(text.substring(start, i)); // We copy the string between two tags
        start = i;
      } else if (c == "]" && inside == 0) {
        start = this.#tag_replace(text, start, i + 1, result);
        i = start;
      }
    }
    result.push(text.substring(start));
    result = result.join("");
    return result;
  }

  #tag_replace(text, start, end, result) {
    let tag = text.substring(start, end);
    let code;
    // The tag is a simple tag, replace and that's it
    if ((code = this.#SIMPLE_TAGS[tag])) {
      result.push(code);
      return end;
    }

    // If the tag is complex, need we need further computation
    let decomposition = this.#tag_decompose(tag);

    // Closing Tag
    if (decomposition['name'][0] == '/') {
      let syntax = this.#COMPLEX_TAGS[decomposition["name"].substring(1)];

      // Not a supported tag
      if(!syntax) {
        result.push(tag);
        return end
      }

      code = `</${syntax['tag']}>`
      if(syntax['add_end']) code = syntax['add_end'] + code
      result.push(code)
      return end
    }

    let syntax = this.#COMPLEX_TAGS[decomposition["name"]];

    // Not a supported tag
    if (!syntax) {
      // Check for table (special cases)
      if(decomposition.name == 'table') {
        return this.#parse_table(text, decomposition, end, result)
      }
      
      result.push(tag);
      return end;
    }

    if (syntax["alias"]) syntax = this.#COMPLEX_TAGS[syntax["alias"]];

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
          if (!html_param[key]) html_param[key] = [val];
          else html_param[key].push(val);
        }
      }

      // Checking the options of the tag found in the decomposition
      for (let [key, value] of Object.entries(decomposition)) {
        // An option is a keyword if it has no value attached to it
        if (key && !value) {
          let kw = syntax["keywords"][key];
          if (kw) {
            // Accepted keyword
            if (!html_param[kw[0]]) html_param[kw[0]] = [];
            html_param[kw[0]].push(kw[1]);
          } else if (key[0] == "#") {
            // Anchor
            html_param["id"] = [key.substring(1)];
          }
          continue;
        }

        let parameter = syntax["params"][key];
        // If the parameter is acceptable, i.e there is an entry for it
        if (parameter) {
          let regex = parameter[2];
          if (regex.test(value)) {
            if (!html_param[parameter[0]]) html_param[parameter[0]] = [];
            let end = "";
            if (parameter.length > 3) end = parameter[3];
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
        if (!sep) sep = "";
        adds += key + '="' + val.join(sep) + '" ';
      }

      let closing;
      if (syntax["self_closing"]) closing = "/>";
      else closing = ">";
      code = "<" + syntax["tag"] + adds + closing;

      if(syntax["add_start"]) code += syntax["add_start"]

      result.push(code);

      return end;
    }

    // The tag requires the content inside it
    // We therefore need to find the closing corresponding tag
    let i = end - 1;
    let content = [];
    let inside = 0
    while (i++ < text.length) {
      if (text[i] == '`') {
        let cpt = 1
        while(text[++i] == '`') cpt++
        if(inside > 0 && cpt >= inside) inside = false
        else if(inside == 0) inside = cpt
      }
      else if (inside == 1 && text[i] == '\n') inside = 0
      if (inside > 0) continue
      // Found potential tag
      if (text[i] == "[") {
        let close = i + 1;
        while (close < text.length && text[close] != "]") close++;
        let close_tag = text.substring(i + 2, close);

        // If it's not the corresponding closing tag
        if (text[i + 1] != "/" || close_tag != decomposition["name"]) {
          if (end != i) content.push(text.substring(end, i));
          end = this.#tag_replace(text, i, close + 1, content);
          i = end;
        } else {
          // If it's the corresponding closing tag
          content.push(text.substring(end, i));
          content = content.join("");
          content = tag + content + "[/" + close_tag + "]";
          // Complex tag are treated using a regex, always
          for (let [key, val] of Object.entries(syntax["regex"])) {
            content = content.replace(val, key);
          }
          result.push(content);
          return close + 1;
        }
      }
    }
    // If we are here we did not found the closing tag
    content.push(text.substring(end, i));
    content = content.join("");
    content = tag + content
    result.push(content)
    return i
  }
}
