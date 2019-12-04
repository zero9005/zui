var Toast = {

	isInit: false,

	hideTimeout: null,

	init: function() {
		this.isInit = true
		var toastWrap = document.createElement('div')

		toastWrap.id = "toastWrap"
		toastWrap.style.position = "fixed"
		toastWrap.style.top = "50%";
		toastWrap.style.left = "50%";
		toastWrap.style.transform = "translate(-50%, -50%)";
		toastWrap.style.maxWidth = "180px"
		toastWrap.style.minWidth = "80px"
		toastWrap.style.background = "rgba(40,40,40,0.8)";
		toastWrap.style.textAlign = "center";
		toastWrap.style.borderRadius = "3px"
		toastWrap.style.color = "#fff"
		toastWrap.style.display = 'none'

		var toastSpan = document.createElement('span');
		toastSpan.id = "toastContent"
		toastSpan.style.display = 'inline-block'
		toastSpan.style.fontSize = "15px"
		toastSpan.style.lineHeight = "22px"
		toastSpan.style.padding = "5px 10px"
		toastSpan.style.wordBreak = "break-all"

		toastWrap.appendChild(toastSpan)

		document.body.appendChild(toastWrap)
	},

	show: function(text, duration) {

		if (!this.isInit) {
			this.init()
			this.isInit = true
		}

		if (this.hideTimeout) {
			clearTimeout(this.hideTimeout)
			this.hideTimeout = null
		}
		if (!text || text.trim() == '') {
			console.error("text 不能为空！")
			return
		}

		var toastWrap = document.querySelector("#toastWrap")
		var toastTextNode = toastWrap.querySelector('#toastContent')

		toastTextNode.innerText = text

		toastWrap.style.display = 'block'

		var context = this

		this.hideTimeout = setTimeout(function() {
			toastWrap.style.display = 'none'
			toastTextNode.innerText = null
			context.hideTimeout = null
		}, duration || 2000)

	}

}
