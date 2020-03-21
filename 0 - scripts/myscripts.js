document.oncontextmenu = function(){return false;}
function disabletext(e){return false}
function reEnable(){return true}
document.onselectstart=new Function ("return false")
if (window.sidebar){
	document.onmousedown=disabletext
	document.onclick=reEnable
}

var remplaza = /\+/gi; 
var url = window.location.href;
url = unescape(url);
url = url.replace(remplaza, " ");
function obtener_valor(variable) {
	var variable_may = variable;
	var variable_pos = url.indexOf(variable);
	if (variable_pos != -1)
	{
		var pos_separador = url.indexOf("&", variable_pos);
		if (pos_separador != -1) 
		{
			return url.substring(variable_pos + variable_may.length + 1, pos_separador);
		}
		else
		{
			return url.substring(variable_pos + variable_may.length + 1, url.length);
		}
	}
	else
	{
		return "NO_ENCONTRADO";
	}
}

function getDocHeight(doc) {
	doc = doc || document;
	// stackoverflow.com/questions/1145850/
	var body = doc.body, html = doc.documentElement;
	var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
	return height;
}
function setIframeHeight(id) {
	var ifrm = document.getElementById(id);
	var doc = ifrm.contentDocument? ifrm.contentDocument:ifrm.contentWindow.document;
	ifrm.style.visibility = 'hidden';
	ifrm.style.height = "10px"; // reset to minimal height ...
	// IE opt. for bing/msn needs a bit added or scrollbar appears
	ifrm.style.height = getDocHeight( doc ) + 4 + "px";
	ifrm.style.visibility = 'visible';
}