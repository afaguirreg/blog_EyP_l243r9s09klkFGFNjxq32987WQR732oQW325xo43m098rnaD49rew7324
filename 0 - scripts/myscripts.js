document.oncontextmenu = function(){return false;}
document.onselectstart=new Function ("return false")
function disabletext(e){return false}
function reEnable(){return true}
if (window.sidebar){
	document.onmousedown=disabletext
	document.onclick=reEnable
}

function obtener_valor(variable) {
	var remplaza = /\+/gi; 
	var url = window.location.href;
	url = unescape(url);
	url = url.replace(remplaza, " ");
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
		return "CONTENIDO";
	}
}

window.onload = function() {
	var valor = obtener_valor("verinfo");
	var element = document.getElementById(valor);
	element.scrollIntoView();
	capturar();
}

document.getElementsByTagName('iframe').onscroll = function(){
	var y = document.getElementsByTagName("img");
				for (var j = 0; j < y.length; j++) {
					var iimg = document.getElementById(y[j].id);
					var imgwidth = iimg.width;
					var imgsuma = imgwidth % 2;
					var imgresta = (imgwidth + 1) % 2;
					iimg.style.width = parseInt( imgwidth + imgsuma - imgresta) + "px";
				}
};

function getDocHeight(doc) {
	doc = doc || document;
	// stackoverflow.com/questions/1145850/
	var body = doc.body, html = doc.documentElement;
	var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
	return height;
}

setInterval(function() {
				var x = document.getElementsByTagName("iframe");
				for (var i = 0; i < x.length; i++) {
					var ifrm = document.getElementById(x[i].id);
					var doc = ifrm.contentDocument ? ifrm.contentDocument:ifrm.contentWindow.document;
					ifrm.style.height = getDocHeight( doc ) + "px";
				}
			},500);