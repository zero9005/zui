var Toast = {
	hideTimeOut: null,
	isInit: false,

	init: function() {
		
		var toastLayer = document.createElement('div')
		toastLayer.innerHTML = '<div class="toast-layer">'
					+ '<div class="toast">'
					+ '<span class="text">测试Toast</span>'
					+ '</div>'
					+ '</div>'
		
		
		toastLayer.id = "toastNode"
		toastLayer.setAttribute("class", "toast");
		toastLayer.style.display = 'none';
		document.body.appendChild(toastLayer)
		isInit = true
	},

	show: function(text, duration) {
		if (!this.isInit) {
			this.init()
		}
		if (this.hideTimeOut) {
			clearTimeout(this.hideTimeOut)
			this.hideTimeOut = null
		}
		if (!text) {
			console.error("text 不能为空！")
			return
		}
		var domToastNode = document.getElementById('toastNode')
		if (!domToastNode) {
			console.error("toastNode不存在！")
			return
		}
		var domToastText = domToastNode.querySelector('.text')
		domToastText.innerText = text || ''
		domToastNode.style.display = 'block'
		
		var that = this
		that.hideTimeOut = setTimeout(function() {
			domToastNode.style.display = 'none'
			that.hideTimeOut = null
		}, duration || 2000)
	},

	hide: function() {
		if (this.hideTimeOut) {
			clearTimeout(this.hideTimeOut)
			this.hideTimeOut = null
		}
		var domToastNode = document.getElementById('toastNode')
		if (domToastNode) {
			domToastNode.style.display = 'none'
		}
	}
}
