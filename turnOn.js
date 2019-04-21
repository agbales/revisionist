(function() {

    // ---- Setup ----
    document.body.spellcheck = false
    document.body.contentEditable = true

    let currentImg
    let links = document.getElementsByTagName('a')
    for (var i = 0; i < links.length; i++) {
        links[i].setAttribute('disabled', 'disabled')
    }
    document.addEventListener('click', clickHandler, true)

    // appendScreenshotButton()

    // ---- Functions ----

    function clickHandler(e) {
        e.stopPropagation()
        e.preventDefault()
        
        if (document.body.spellcheck) return
        if (e.target.id === 'screenshot') return screenShot()
        if (e.target.id === 'url-submit') return updateImg(e) 

        checkForImg(e)
    }

    function checkForImg(e) {
        let isImg = e.target.nodeName.toLowerCase() === 'img'
        if (isImg) appendImgUpdateInput(e)
    }

    function appendImgUpdateInput(e) {
        let form = (currentSrc) => {
            let wrapperStyle  = 'position:fixed;bottom:0;left:0;width:100vw;padding-top:20px;padding-right:25px;padding-bottom:25px;padding-left:25px;height:30px;background-color:#E4658E;z-index:9999;'
            let inputStyle = 'display:inline-block;width:70vw;background-color:#E4658E;color:#ffffff;padding:5px;'
            let buttonStyle = 'display:inline-block;background-color:#fff;color:#181818;border-radius:5px;border:none;padding:5px;'

            return(`<div id="imgUpdateInput" style=${wrapperStyle}>
                        <form>
                            <span style="display:inline-block;color:#fff;">Image URL:</span>
                            <input type="text" style=${inputStyle} id="urlInput" value=${currentSrc}></input>
                            <input id="url-submit" style=${buttonStyle} type="submit" value="Update"/>
                        </form>
                    </div>`)
        }
        
        currentImg = e.srcElement

        let src = e.srcElement.src || 'placeholder.com'
        let linkUpdateBar = document.createElement('div')
            linkUpdateBar.innerHTML = form(src)
        
        document.body.appendChild(linkUpdateBar)
    }

    function appendScreenshotButton() {
        let interfaceHTML = `<div style="position:fixed;bottom:0;left:0;height:50px;width:100vw;z-index:9999;background-color:#FFBD33;color:#1a1a1a;" id="screenshot" data-html2canvas-ignore="true">
                                <button id="screenshot" data-html2canvas-ignore="true" style="margin:10px;padding:5px">Take screenshot</button>
                            </div>`

        let interface = document.createElement('div')
        interface.innerHTML = interfaceHTML

        document.body.appendChild(interface)
    }

    function removeImgUpdateInput() {
        let input = document.getElementById('imgUpdateInput')
            input.parentElement.removeChild(input)
    }

    function screenShot() {
        console.log('Screenshot!')
        html2canvas(document.querySelector('body')).then(function(canvas) {
            let a = document.createElement('a');
            a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
            a.download = 'revisionist_screenshot.jpg';
            a.click();
        });
    }

    function updateImg(e) {
        let newUrl = document.getElementById('urlInput').value

        currentImg.src= newUrl
        currentImg.srcset = newUrl
        currentImg.style.overflow = 'hidden'
        currentImg.style.width = 'auto'

        removeImgUpdateInput()
    }
})();