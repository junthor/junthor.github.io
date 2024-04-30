export const MOUSE_POS = { x: 0, y: 0 };
document.onmousemove = function (e) {
    MOUSE_POS.x = e.pageX;
    MOUSE_POS.y = e.pageY;
};
export function format(str, args) {
    let formatted = str;
    for (let i = 0; i < args.length; i++) {
        let regexp = new RegExp("\\{" + i + "\\}", "gi");
        formatted = formatted.replace(regexp, args[i]);
    }
    return formatted;
}
function set_column_heights(columns) {
    for (const column of columns) {
        if (!(column instanceof HTMLElement))
            continue;
        // Chrome can handle columns break, so no need for extra work here
        if (isWebkit())
            return;
        let previous = column.previousElementSibling;
        let bottom = column.offsetTop;
        let previous_style;
        if (previous) {
            previous_style = getComputedStyle(previous);
            while (previous && previous_style.position == "absolute") {
                previous = previous.previousElementSibling;
                if (previous)
                    previous_style = getComputedStyle(previous);
            }
        }
        if (previous && previous_style) {
            bottom =
                previous.offsetTop + previous.offsetHeight + 2 +
                    parseFloat(previous_style.marginBottom);
        }
        if (Number.isNaN(bottom))
            bottom = column.offsetTop;
        // We changed column inside the previous element!
        // Safe to assume we can use the top of column
        let page = document.getElementById("page0");
        if (page == null)
            return;
        page = page.children[0];
        if (page.offsetHeight + page.offsetTop < bottom)
            bottom = column.offsetTop;
        column.style.height = `calc(var(--page-height) - var(--page-margin-bottom) - ${bottom}px)`;
    }
}
export function set_columnbreak(columns) {
    set_column_heights(columns);
    //TODO: WHY???????
    // It seems like there is a small time between the style affectation and the style updating
    // So much that offsetTop might not work as intended
    // Therefore we add a small delay and relaunch the function to make sure we update everything
    // setTimeout(() => set_column_heights(columns), 0)
}
export function print_document(css, title) {
    let pages = document.getElementById('page-container');
    if (!pages)
        return;
    let data = pages.innerHTML;
    let myWindow = window.open('', title, 'fullscreen=1');
    if (!myWindow)
        return;
    myWindow.document.write(`<html><head><title>${title}</title>`);
    myWindow.document.write('<link rel="preconnect" href="https://fonts.googleapis.com">');
    myWindow.document.write('<link rel="stylesheet" href="./styles/css/editor.css" type="text/css" />');
    myWindow.document.write('</head>');
    myWindow.document.write(css);
    myWindow.document.write('<body style="overflow-y: auto; height: fit-content">');
    myWindow.document.write(data);
    myWindow.document.write('</body></html>');
    myWindow.document.close();
    myWindow.onload = function () {
        myWindow.focus();
        myWindow.print();
        //myWindow.close();
    };
}
export function isWebkit() {
    return /Chrome/.test(navigator.userAgent);
}
