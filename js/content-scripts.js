document.addEventListener('DOMContentLoaded', () => {

    document.onkeydown = toggleShowProperties

    setInterval(() => {
        if(document.querySelectorAll('.notion-peek-renderer .notion-scroller.vertical > div').length !== 0) {
            const value =  localStorage.getItem('toggle-show-properties')
            const color = value === 'false' ? 'rgba(130, 247, 237, 0.82)' : 'rgba(238, 247, 69, 0.89)'
            const targetNode = document.querySelector('.notion-peek-renderer .notion-scroller.vertical').parentElement.firstElementChild.firstChild.firstElementChild
            targetNode.style.backgroundColor = color
            targetNode.style.borderRadius = '6px'
            if(value === 'false') {
                document.querySelectorAll('.notion-peek-renderer .notion-scroller.vertical > div')[1].innerHTML = ''
                document.querySelectorAll('.notion-peek-renderer .notion-scroller.vertical > div')[2].innerHTML = ''
            }
        }
    }, 100)

    console.log('DOMContentLoaded')
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('收到来自 ' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request);
    switch (request.cmd) {
        case 'save-cole-github-token-and-username':
            saveTokenAndUsername(request.token, request.username);
            break;
        default:
            console.log('收到来自无法识别的消息类型', request);
            break;
    }
    sendResponse('ok')
});

var keyCodeNumber = {
    o: 79, r: 82, f: 70, a: 65, s: 83, z: 90, t: 84, x: 88, one: 49, c: 67, dot: 190, esc:27, h:72
}

const toggleShowProperties = (e) => {
    try {
        const keyCode = e.keyCode || e.which || e.charCode
        const altKey = e.altKey

        if (altKey && keyCode === keyCodeNumber.x) {
            const value =  localStorage.getItem('toggle-show-properties')

            const newValue = value === 'true' ? 'false' : 'true';

            localStorage.setItem('toggle-show-properties', newValue)

            e.preventDefault()
            return
        }
    } catch (e) {
        console.log(e)
    }
}