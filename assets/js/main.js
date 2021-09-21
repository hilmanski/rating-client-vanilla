const baseURL = 'http://fakerating.us-3.evennode.com' //'http://localhost:5000'

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