class PageManager {
  #positions;
  #tags;
  #max_distance;

  constructor() {
    this.#positions = [-1];
    this.#tags = [
      '[newpage]'
    ]
    this.#max_distance = this.#tags[this.#tags.length - 1].length
  }

  #get_actual_start(text, page) {
    if (page == 0) return this.#positions[page] + 1
    // we know that at #positions[page] there is a ]
    let i = this.#positions[page]
    while(text[i] != '[') i--
    return i
  }

  get_range(text, first_page, n) {
    let start = this.#get_actual_start(text, first_page)
    if (first_page + n >= this.#positions.length) return {start: start, end: undefined}
    return {
      start: start, 
      end: this.#positions[first_page + n] + 1
    }
  }

  on_insert(text, start, end){
    const res = { page: this.page_at_cursor(start), updated: 1, delta: 0 }

    // Update all positions after the change
    for(let i = res.page + 1; i < this.#positions.length; i++) {
      this.#positions[i] += end - start
    }

    // Check the first tag to see if we destroyed it
    if(this.#positions.length > res.page + 1) {
      let tag_end = this.#positions[res.page + 1]
      let test = this.#check_around_cursor(text, tag_end, this.#tags, this.#max_distance)
      if (test < 0) {
        res.delta--
        this.#remove_page(res.page + 1)
      }
    }

    // Check if we have a newpage at the start
    let on_start = this.#check_around_cursor(text, start, this.#tags, this.#max_distance)
    if (on_start >= 0 && this.#insert_page(on_start)) {
      // There is a newpage
      res.updated++
      res.delta++
    }

    // Check if we have a newpage in the middle
    let idx = start + 1
    while(idx < end) {
      while(idx < end && text[idx] != '[') idx++
      let position = idx+1
      while(position < end && (text[position] != ']' && text[position] != '[')) position++
      if(text[position] == '[') {
        idx = position
        continue
      }
      let tag = text.substring(idx, position + 1)
      if (this.#tags.includes(tag) && this.#insert_page(position)) {
        res.updated++
        res.delta++
      }
      idx = position + 1
    }

    // Check if we have a newpage at the end
    let on_end = this.#check_around_cursor(text, end, this.#tags, this.#max_distance)
    if (on_end >= 0 && this.#insert_page(on_end)) {
      // There is a newpage
      res.updated++
      res.delta++
    }

    return res
  }


  /**
   * Update positions of the pages relative to the deletions
   * @param {*} text The text
   * @param {*} start The start pos of the deletion
   * @param {*} end  The end pos of the deletion
   * @returns [first page to update, number of pages to update, numbers of pages removed]
   */
  on_remove(text, start, end) {
    const res = { page: this.page_at_cursor(start), updated: 1, delta: 0}
    let removed = this.#detect_removed(text, start, end)
    for(let i = removed.length - 1; i >= 0; i--) this.#remove_page(removed[i])
    res.delta = 0-removed.length

    for(let i = res.page + 1; i < this.#positions.length; i++) {
      this.#positions[i] -= end-start
    }

    let position = this.#check_around_cursor(text, start, this.#tags, this.#max_distance)
    if (position >= 0 && this.#insert_page(position)){
      res.delta++
      res.updated++
    }

    return res
  }

  /**
   * Get the index of the page where the cursor is
   * @param {*} cursor The position of the cursor
   * @returns The index of the page
   */
  page_at_cursor(cursor){
    if (this.#positions.length == 1) return 0
    for(let i = 0; i < this.#positions.length - 1; i++) {
      if(this.#positions[i] < cursor && cursor <= this.#positions[i+1]) return i
    }
    return this.#positions.length - 1
  }

  /**
   * Search for an occurence of the given word
   * @param {*} text 
   * @param {*} start 
   * @param {*} end 
   * @param {*} word 
   * @returns The index of the first letter if the word is matched, -1 otherwise
   */
  #search_for(text, start, end, word) {
    let c = start
    while(c < end) {
      let i = 0
      while(c < end && text[c] != word[i]) c++
      while(c+i < end && i < word.length && text[c+i] == word[i]) i++
      if(i == word.length) return c
      c++
    }
    return -1
  }

  /**
   * Check around the cursor position for the first newpage (left to right)
   * @param {*} text The text
   * @param {*} cursor The position to check
   * @param {*} tags The tags to check for
   * @param {*} max_distance The maximum search distance
   * @returns The end position of the tag if it exists, -1 otherwise
   */
  #check_around_cursor(text, cursor, tags, max_distance = 20){
    let start = cursor  - max_distance
    while(cursor+max_distance - start > 9) {
      // Find the open bracket of the tag
      start = this.#search_for(text, start, cursor+max_distance, '[newpage')
      let end = start+8

      if(start == -1) return -1
      // Find the close bracket of the tag
      while(end-cursor < max_distance && text[end] != ']') end++
      if(text[end] != ']') return -1

      // Check if the tag we found is valid
      let element = text.substring(start, end+1)
      if(tags.includes(element)) return end
      start += 8
    }

    return -1
  }

  /**
   * Detect which pages were affected by the deletion
   * @param {*} start 
   * @param {*} end 
   * @returns All pages affected by the remove
   */
  #detect_removed(text, start, end) {
    // Every position between start and end should be detected
    let pages = []
    for(let i = 1; i < this.#positions.length; i++) {
      if(this.#positions[i] >= end + this.#max_distance) break
      if(this.#is_affected(text, i, start, end)) pages.push(i)
    }
    return pages
  }

  /**
   * Check if a page is affected by the remove operation
   * @param {*} i The index of the page
   * @param {*} start The starting pos of the deletion
   * @param {*} end  The end pos of the deletion
   * @returns True if the page was removed by the deletion
   */
  #is_affected(text, i, start, end){
    if(this.#positions.length == 1) return false
    // If the start of the page is before the start, then no
    if(this.#positions[i] < start) return false
    // If the start of the page is after the end, then no
    if(this.#positions[i] >= end) {
      // check if we deleted part of the next [newpage]
      if(this.#positions[i] - this.#max_distance <= end) {
        let pos = this.#check_around_cursor(text, end, this.#tags, this.#max_distance)
        return this.#positions[i] != pos + (end-start)
      }
      return false
    }
    return true
  }

  /**
   * Insert a new page position to the array of positions
   * @param index 
   * @returns 
   */
  #insert_page(index) {
    for (let i = 0; i < this.#positions.length; i++) {
      if (this.#positions[i] == index) return false
      if (this.#positions[i] > index) {
        this.#positions.splice(i, 0, index);
        return true
      }
    }
    this.#positions.push(index);
    return true
  }

  #remove_page(i){
    this.#positions.splice(i, 1)
  }

  get_positions(){
    return this.#positions
  }

}
