// cookies.js
// Derived from the Bill Dortch code at http://www.hidaho.com/cookies/cookie.txt

define([],function(){
	var cookies={
		getCookieVal:function(offset) {
			var endstr = document.cookie.indexOf (";", offset);
			if (endstr == -1) { endstr = document.cookie.length; }
			return unescape(document.cookie.substring(offset,endstr));
		},
		getCookie:function(name) {
			var arg = name + "=";
			var alen = arg.length;
			var clen = document.cookie.length;
			var i = 0;
			while (i < clen) {
			var j = i + alen;
			if (document.cookie.substring(i, j) == arg) {
			  return this.getCookieVal(j);
			  }
			i = document.cookie.indexOf(" ", i) + 1;
			if (i == 0) break;
			}
			return null;
		},
		deleteCookie:function(name,path,domain) {
			if (this.getCookie(name)) {
			document.cookie = name + "=" +
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			"; expires=Thu, 01-Jan-70 00:00:01 GMT";
			}
		},
		setCookie:function(name,value,expires,path,domain,secure) {
			document.cookie = name + "=" + escape (value) +
			((expires) ? "; expires=" + expires.toGMTString() : "") +
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			((secure) ? "; secure" : "");
		}
	};
	return cookies;
});