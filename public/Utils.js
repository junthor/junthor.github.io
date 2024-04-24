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
export function set_columnbreak(columns) {
    for (const column of columns) {
        if (!(column instanceof HTMLElement))
            continue;
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
export function print_document(css) {
    let pages = document.getElementById('page-container');
    if (!pages)
        return;
    let data = pages.innerHTML;
    let myWindow = window.open('', 'Tales', 'fullscreen=1');
    if (!myWindow)
        return;
    myWindow.document.write('<html><head><title>Tales</title>');
    myWindow.document.write('<link rel="preconnect" href="https://fonts.googleapis.com">');
    myWindow.document.write('<link rel="stylesheet" href="./styles/css/editor.css" type="text/css" />');
    myWindow.document.write('</head>');
    myWindow.document.write(css);
    myWindow.document.write('<body>');
    myWindow.document.write(data);
    myWindow.document.write('</body></html>');
    myWindow.document.close();
    myWindow.onload = function () {
        myWindow.focus();
        myWindow.print();
        //myWindow.close();
    };
}
