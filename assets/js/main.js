const baseURL = 'https://fakerating.deta.dev'

//custom selector
function $(el) {
    const type = el.charAt(0)
    switch (type) {
        case "#":
            return document.querySelector(el)
            break;
        case ".":
            return document.querySelectorAll(el)
            break;
        default:
            return document.getElementsByTagName(el)
    }
}