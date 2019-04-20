(function() {
	document.body.contentEditable = false
	document.body.spellcheck = true

	let links = document.getElementsByTagName('a')

	for (var i = 0; i < links.length; i++) {
		links[i].setAttribute('disabled', false)
	}

	let imgInput = document.getElementById('imgUpdateInput')
	if (imgInput) input.parentElement.removeChild(imgInput)

	let screenshotButton = document.getElementById('screenshot')
	if (screenshotButton) screenshotButton.parentElement.removeChild(screenshotButton)
})();