export function css_copy(obj) {
    let copy = {};
    for (let key in obj)
        copy[key] = obj[key].substring(0);
    return copy;
}
export function style_copy(obj) {
    let copy = {};
    for (let key in obj)
        copy[key] = css_copy(obj[key]);
    return copy;
}
