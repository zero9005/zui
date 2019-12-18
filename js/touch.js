var Touch = {

	startX: 0,
	startY: 0,
	isInit: false,
	upCallback: null,

	init: function(selector) {
		var _this = this
		document.querySelector(selector).addEventListener("touchstart", function(e) {

			_this.startX = e.changedTouches[0].pageX
			_this.startY = e.changedTouches[0].pageY
		});
		document.querySelector(selector).addEventListener("touchmove", function(e) {
			moveEndX = e.changedTouches[0].pageX
			moveEndY = e.changedTouches[0].pageY
			X = moveEndX - _this.startX
			Y = moveEndY - _this.startY

			console.log(`X: ${X}, Y: ${Y}, c: ` + (Math.abs(X) < 50 && Y < -50))

			if (Math.abs(X) < 50 && Y < -50) {
				if (_this.upCallback && typeof _this.upCallback === 'function') {
					_this.upCallback()
				}
			}
		})
		return _this
	},
	up: function(callback) {
		this.upCallback = callback
	}
}
