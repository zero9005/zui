(function(w) {
	'use strict';
	var App = function() {
		
	}
	App.prototype.http = function(options) {
		var xhr = new XMLHttpRequest()
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				var contentType = xhr.getResponseHeader('Content-Type')
				var response = xhr.responseText
				if (contentType && contentType.indexOf('json') > -1) {
					response = JSON.parse(response)
				} 
				if (options.success && typeof options.success === 'function') {
					options.success(response)
				}
			} else if (xhr.readyState == 4 && xhr.status != 200) {
				options.error()
			}
		}
		
		var urlStr = ''
		for (var key in options.data) {
			urlStr += key + '=' + options.data[key] + '&'
		}
		urlStr = urlStr.substring(0, urlStr.length - 1)
		
		var method = options.method || 'get'
		method = method.toLocaleLowerCase()
		var async = options.async || true
		
		var url = options.url
		
		if (method === 'get' && urlStr) {
			url = url + '?' + urlStr
		} 
		
		xhr.open(method, url, async)
		
		if (options.header) {
			for (var key in options.header) {
				xhr.setRequestHeader(key, options.header[key])
			}
		}
		
		if (method === 'get') {
			xhr.send()
		} else {
			if (method === 'post') {
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
			}
			xhr.send(urlStr)
		}
	}
	
	App.prototype.getQueryString = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURIComponent((r[2])); return null;
	}
	
	w.App = new App()

})(window)