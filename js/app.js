(function(w) {
	'use strict';
	var App = function() {
		
	}
	App.prototype.http = function(options) {
		var xhr = new XMLHttpRequest()
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				options.success(xhr.responseText)
			} else if (xhr.readyState == 4 && xhr.status != 200) {
				options.error()
			}
		}
		
		var urlStr = ''
		for (var key in options.data) {
			urlStr += key + '=' + options.data[key] + '&'
		}
		urlStr = urlStr.substring(0, urlStr.length - 1)
		
		var type = options.type || 'get'
		type = type.toLocaleLowerCase()
		var async = options.async || true
		
		var url = options.url
		
		if (type === 'get') {
			url = url + '?' + urlStr
		} else if (type === 'post') {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		}
		
		xhr.open(type, url, async)
		
		if (options.headers) {
			for (var key in options.headers) {
				xhr.setRequestHeader(key, options.headers[key])
			}
		}
		
		if (type === 'get') {
			xhr.send()
		} else {
			xhr.send(urlStr)
		}
	}
			
	w.App = new App()

})(window)