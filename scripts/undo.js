class ActionStack {

    #undo
    #us

    #redo
    #rs

    constructor(max_size=20) {
       this.#redo = []
       this.#undo = [] 

       this.#rs = 0
       this.#us = 0
    }

    undo(){
        if(this.#us == 0) return
        let last_action = this.#undo[this.#us--]
        this.#redo.push(last_action)
    }

}