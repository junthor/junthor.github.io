const MOUSE_POS = { x: 0, y: 0 };

document.onmousemove = function (e) {
  MOUSE_POS.x = e.pageX;
  MOUSE_POS.y = e.pageY;
};

class BBEditor {
  container;
  editor;
  content;
  separator;
  pages;
  
  right_panel;
  page_zoom;

  #parser;
  #stylist;
  #page_manager;
  #file_manager;

  constructor(container) {
    this.page_zoom = "auto"
    this.#page_manager = new PageManager()
    this.pages = [];
    this.container = document.getElementById(container);
    this.editor = document.createElement("pre");
    this.separator = document.createElement("div");
    this.content = document.createElement("div");
    this.content_container = document.createElement("div");

    this.editor.className = "bbcode-editor";
    this.editor.id = "bbcode-editor";

    this.separator.addEventListener("mousedown", this.#resize);
    this.separator.className = "splitter";

    let goto_page = document.createElement('div')
    goto_page.className = 'goto-page'
    goto_page.title = "Find page at cursor"
    goto_page.innerHTML = '<i class="fa-solid fa-arrow-right"></i>'
    goto_page.addEventListener("mousedown", e => { 
      e.preventDefault(); e.stopImmediatePropagation();
      this.goto_page()
    })

    this.separator.appendChild(goto_page)
    this.separator.style.position = 'relative'

    let big_container = document.createElement("div");
    big_container.className = "bbcode-content-container";
    this.right_panel = big_container;

    big_container.appendChild(this.#create_topbar());
    big_container.appendChild(this.content_container);

    this.content_container.className = "bbcode-content";
    this.content.id = "page-container";

    this.container.appendChild(this.editor);
    this.container.appendChild(this.separator);
    this.content_container.appendChild(this.content);
    this.container.appendChild(big_container);

    this.#parser = new BBParser();
    this.#stylist = new Stylist();
    this.#stylist.hot_load();

    let ace_editor = ace.edit("bbcode-editor");
    ace_editor.setTheme("ace/theme/monokai");
    ace_editor.session.setMode("ace/mode/markdown");
    ace_editor.className += "bbcode-editor";
    ace_editor.setOptions({
      wrapBehavioursEnabled: true,
      wrap: true,
      wrapMethod: "auto",
      autoScrollEditorIntoView: true,  
    });

    this.editor = ace_editor;

    this.separator.editor = this;
    this.container.editor = this;

    //document.getElementsByClassName('ace_text-input')[0].addEventListener('keydown', e => this.key_down(e))

    this.editor.addEventListener("change", (e) => this.key_down(e));

    this.editor.setShowPrintMargin(false);
    this.#create_page()

    this.#file_manager = new DocumentSaver(this, this.#stylist)
  }

  save(){
    return this.#file_manager.save()
  }

  load(input) {
    let file = input.files[0]
    if(file) this.#file_manager.load(file)
  }

  undo() { this.#stylist.undo() }
  redo() { this.#stylist.redo() }

  key_down(e) {
    let text = this.get_text()

    // Number of characters in the delta
    let length = e.lines.length - 1;
    for (const element of e.lines) length += element.length;

    let start = this.editor.session.doc.positionToIndex(e.start);
    let data

    if(e.action == "remove") {
      data = this.#page_manager.on_remove(text, start, start + length)
    } else {
      data = this.#page_manager.on_insert(text, start, start + length)
    }

    this.parse(data)
  }

  #create_topbar() {
    let buttonbar = document.createElement("div");
    buttonbar.className = "bbcode-content-buttons";

    let save_button = document.createElement("button");
    save_button.className = "save-button";
    save_button.title = "Save file";
    save_button.innerHTML = '<i class="bi bi-floppy2-fill"></i> Save';
    save_button.addEventListener("click", (e) => this.save());

    let load_input = document.createElement("input");
    load_input.type = "file"
    load_input.accept = ".curator"
    load_input.id = "load-input"
    load_input.addEventListener("change", (e) => this.load(load_input));

    let load_button = document.createElement("label");
    load_button.setAttribute('for', 'load-input')
    load_button.className = "load-button";
    load_button.title = "Open file"
    load_button.innerHTML = '<i class="bi bi-folder-symlink-fill"></i> Open'

    let paper_format = document.createElement("select")
    paper_format.id = "format-selector"
    paper_format.innerHTML  = '<option value="A4">A4</option>'
    paper_format.innerHTML += '<option value="A5">A5</option>'
    paper_format.innerHTML += '<option value="Letter">Letter</option>'
    paper_format.addEventListener('change', e => 
      this.#stylist.set_page_format(paper_format, this)
    )

    let zoom = document.createElement("select")
    zoom.id = "zoom-selector"
    zoom.innerHTML = '<option value="auto">Auto</option>'
    const zoom_values = [50, 75, 100, 125, 150, 200, 250]
    for(const value of zoom_values) {
      zoom.innerHTML += `<option value="${value / 100.0}">${value}%</option>`
    }
    zoom.addEventListener('change', e => this.set_zoom_page(zoom.value))


    let pdf_button = document.createElement("button");
    pdf_button.className = "print-button";
    pdf_button.title = "Save as PDF";
    pdf_button.innerHTML = '<i class="bi bi-filetype-pdf"></i>';
    pdf_button.addEventListener("click", PrintDiv);

    

    let guide_button = document.createElement("button");
    guide_button.className = "guide-button";
    guide_button.title = "Load Guide";
    guide_button.innerHTML = '<i class="fa-solid fa-circle-question"></i> Guide';
    guide_button.addEventListener("click", (e) => this.#file_manager.apply_data(GUIDE_AUTOLOAD));

    buttonbar.appendChild(load_button);
    buttonbar.appendChild(load_input);
    buttonbar.appendChild(save_button);
    buttonbar.appendChild(paper_format);
    buttonbar.appendChild(zoom);
    buttonbar.appendChild(pdf_button);
    buttonbar.appendChild(guide_button);

    return buttonbar;
  }

  load_style(style) {
    this.#stylist.merge_style(style);
    this.#stylist.hot_load();
  }

  style_css() {
    return this.#stylist.to_css();
  }

  get_text() {
    return this.editor.getValue();
  }

  clear_text() {
    let selection = this.editor.getSelection();
    selection.selectAll();
    this.editor.remove();
  }

  set_text(text) {
    this.clear_text();
    this.editor.insert(text);
  }

  #manage_unchanged_pages(first_page, delta) {

    if (delta > 0) {
      this.#set_pages_number(this.pages.length + delta);
      // In order not to create pages and re-parse untouched pages
      // We swap their position in the table when we delete or remove other pages
      let i = this.pages.length - 1;

      while (i >= first_page + delta) {
        this.pages[i].innerHTML = this.pages[i-delta].innerHTML
        i--;
      }

    } else if (delta < 0) {
      let i = first_page;

      while (i - delta < this.pages.length) {
        this.pages[i].innerHTML = this.pages[i-delta].innerHTML
        i++;
      }

      this.#set_pages_number(this.pages.length + delta);
    }

  }

  simple_parse(data) {
    return this.#parser.simple_parse(data)
  }

  parse(data) {
    let first_page = 0;
    let text = this.get_text();
    let offset = 0
    let start_offset = 0

    if (data) {
      let range = this.#page_manager.get_range(text, data.page, data.updated)
      text = text.substring(range.start, range.end)
      first_page = data.page
      if(range.end) offset = 1
      if(data.page > 0) start_offset = 1

      this.#manage_unchanged_pages(first_page + 1, data.delta)
      text = this.#parser.parse(text, this.#page_manager.get_positions(), first_page, start_offset, offset)
    } else {
      text = this.#parser.parse(text, this.#page_manager.get_positions());
      this.#set_pages_number(text.length)
    }

    for (let i = start_offset; i < text.length - offset; i++) {
      let page = this.pages[first_page + i - start_offset];
      page.innerHTML = `<div class="page-content">${text[i]}</div>`;

      // Adding class to Lettrine
      let headings = page.getElementsByTagName("h1")
      for(const h1 of headings) {
        let next = h1.nextElementSibling
        if(next && next.tagName == "P") {
          next.classList.add(next.innerText[0].toUpperCase())
        }
      }
      
      // Adapt the column break to the new page
      let columns = page.getElementsByClassName('column-break')
      set_columnbreak(columns)
    }
  }

  #create_page() {
    let newpage = document.createElement("div");
    newpage.className = "page";
    newpage.id = "page" + this.pages.length;
    this.pages.push(newpage);
    this.content.appendChild(newpage);
    return newpage;
  }

  #set_pages_number(n) {
    let number = this.pages.length - n;
    if (number <= 0) {
      while (this.pages.length < n) this.#create_page();
      return;
    }
    // Delete excess
    let deleted = this.pages.splice(n, number);
    for (const element of deleted) this.content.removeChild(element);
  }

  focus_page(element, offset = 0) {
    let page = element
    while(!page.id.includes("page")) page = page.parentNode
    page = page.id.substring(4)
    let index = this.#page_manager.get_positions()[page] + offset + 1
    this.move_cursor_to_index(index)
  }

  move_cursor_to_index(index) {
    let position = this.editor.session.getDocument().indexToPosition(index)
    this.move_cursor_to_position(position)
  }

  move_cursor_to_position(position){
    this.editor.scrollToLine(position.row, true, true)
    this.editor.getSelection().moveToPosition(position)
    this.editor.focus();
  }

  goto_page() {
    let position = this.editor.getSelectionRange().start;
    let index = this.editor.session.getDocument().positionToIndex(position)
    let page_index = this.#page_manager.page_at_cursor(index)
    let page = document.getElementById(`page${page_index}`)
    if(page) page.scrollIntoView();
  }

  insert(o_tag, c_tag = "", keep_content = true) {
    let range = this.editor.getSelectionRange();

    if (!keep_content) this.editor.remove();
    this.editor.clearSelection()

    if (c_tag && c_tag != "") {
      this.editor.moveCursorToPosition(range.end);
      this.editor.insert(c_tag);
    }
    this.editor.moveCursorToPosition(range.start);
    this.editor.insert(o_tag);

    if (range.end.row != range.start.row && range.end.column != range.start.column) {
      range.end.column += o_tag.length
      this.editor.getSelection().selectToPosition(range.end)
    }
    this.move_cursor_to_position({row: range.start.row, column: range.start.column + o_tag.length})
  }

  insert_line(start, end = '', sep = '\n') {
    let text = this.editor.getSelectedText().split(sep)

    for(let i = 0; i < text.length; i++) text[i] = format(start, [i+1]) + text[i] + end
    text = text.join(sep)

    this.editor.insert(text)
    this.editor.focus();
  }

  /**
   * Resize the width of the editor panels
   * @param {*} left Left panel (writing)
   * @param {*} right Right panel (rendering)
   */
  #resize(e) {
    console.log(this)
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    this.editor.container.addEventListener(
      "mousemove",
      this.editor.resize_drag
    );
    this.editor.container.addEventListener("mouseup", this.editor.resize_end);
  }

  resize_end() {
    this.editor.container.removeEventListener(
      "mousemove",
      this.editor.resize_drag
    );
    this.editor.container.removeEventListener(
      "mouseup",
      this.editor.resize_end
    );
  }

  resize_drag() {
    let width = this.offsetWidth;

    // A4 format
    let page_height = document.getElementById('page0').offsetHeight;
    let page_width = document.getElementById('page0').offsetWidth;
    let left_panel = this.editor.editor.container;
    let right_panel = this.editor.right_panel;
    let page_zoom = this.editor.page_zoom

    // Padding of container * 2 + desired margin
    let magic = 30 * 2 + 30;

    let lw = MOUSE_POS.x - 3;
    let rw = width - lw - 3;

    if (page_zoom == "auto") {
      let zoom = (rw - magic) / page_width;
      right_panel.style.width = rw + "px";
      this.editor.#zoom_page(zoom, page_width, page_height)
    } else {
      right_panel.style.width = rw + "px";
      this.editor.#zoom_page(page_zoom, page_width, page_height)
    }
    left_panel.style.width = lw + "px";
  }

  update_page_zoom(){
    this.set_zoom_page(this.page_zoom)
  }

  set_zoom_page(value){
    if(value == "auto") this.#fit_page()
    else this.#zoom_page(value)
    this.page_zoom = value
  }

  #zoom_page(value, width, height){
    if(!height) height = document.getElementById('page0').offsetHeight;
    if(!width) width = document.getElementById('page0').offsetWidth;

    let w = width * value
    let h = height * value
    this.content.style.transformOrigin = "left top";
    this.content.style.position = "absolute";
    this.content.style.left = "unset"
    if(value >= 1) {
      if(w < this.right_panel.offsetWidth) {
        this.content.style.transformOrigin = "center top";
        w = width
        h = height
      }
      else {
        this.content.style.left = "15px"
        w = width + 30
        h = height
      }
    }
    this.content.style.transform = "scale(" + value + ")";
    this.content.style.width = w + "px";
    this.content.style.height = h + "px";
  }

  #fit_page(rw, width, magic = 90){
    if(!width) width = document.getElementById('page0').offsetWidth;
    if(!rw) rw = this.right_panel.offsetWidth;
    let zoom = (rw - magic) / width;
    this.#zoom_page(zoom, width)
  }

  render_toc(){
    let toc = this.#parser.get_toc()
    let toc_html = '[toc]\n\n# Table of Content\n\n'
    let previous_level = 1
    for(let p in toc) {
      if(p >= this.pages.length) continue
      for(let data in toc[p]) {
        let level = toc[p][data][0]
        let heading = toc[p][data][1]
        let page = parseInt(p) + 1

        let padding = ''

        // Jumping multiple levels
        if(previous_level < level - 1) {
          padding += '\t'.repeat(previous_level - 1)
          padding += '\t-'.repeat(level - previous_level - 1) + '\t'
        } else padding = '\t'.repeat(level - 1)
        toc_html += padding + `- ${heading} :: ${page}\n`
        previous_level = level
      }
    }
    return toc_html + '\n[/toc]'
  }

}


function format(str, args) {
  let formatted = str;
  for (let i = 0; i < args.length; i++) {
      let regexp = new RegExp('\\{'+i+'\\}', 'gi');
      formatted = formatted.replace(regexp, args[i]);
  }
  return formatted;
};

function set_columnbreak(columns) {
  for(const column of columns) {
    let previous = column.previousElementSibling
    let bottom = column.offsetTop
    let previous_style
    if(previous) {
      previous_style = getComputedStyle(previous)
      while(previous && previous_style.position == "absolute"){
        previous = previous.previousElementSibling
        previous_style = getComputedStyle(previous)
      } 
    }
    if(previous) bottom = previous.offsetTop + previous.offsetHeight + parseFloat(previous_style.marginBottom) + 2
    if(Number.isNaN(bottom)) bottom = column.offsetTop 

    // We changed column inside the previous element!
    // Safe to assume we can use the top of column
    let page = document.getElementById('page0').children[0]
    if(page.offsetHeight + page.offsetTop < bottom) bottom = column.offsetTop

    column.style.height = `calc(var(--page-height) - var(--page-margin-bottom) - ${bottom}px)`
  }
}