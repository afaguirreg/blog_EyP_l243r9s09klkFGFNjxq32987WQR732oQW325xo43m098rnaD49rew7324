document.oncontextmenu = function(){return false;}
document.onselectstart = new Function ("return false")

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
	if (valor != "CONTENIDO") {
		var element = document.getElementById(valor);
	}
	
	var tipo_7seg = obtener_valor("tipo_7seg");
	if (tipo_7seg != "CONTENIDO") {
		document.getElementById("tipo_7seg").innerHTML = obtener_valor("tipo_7seg");
	}

	var lbi = obtener_valor("LED_BUILTIN");
	if (lbi != "CONTENIDO") {
		document.getElementById("LED_BUILTIN_1").innerHTML = obtener_valor("LED_BUILTIN");
		document.getElementById("LED_BUILTIN_2").innerHTML = obtener_valor("LED_BUILTIN");
		document.getElementById("LED_BUILTIN_3").innerHTML = obtener_valor("LED_BUILTIN");
	}

	var Wire_SDA = obtener_valor("Wire_SDA");
	if (Wire_SDA != "CONTENIDO") {
		document.getElementById("Wire_SDA").innerHTML = obtener_valor("Wire_SDA");
		document.getElementById("Wire_SCL").innerHTML = obtener_valor("Wire_SCL");
		document.getElementById("br").innerHTML = obtener_valor("br");
	}
	
	var pin_A0 = obtener_valor("pin_A0");
	if (pin_A0 != "CONTENIDO") {
		document.getElementById("pin_A0").innerHTML = obtener_valor("pin_A0");
	}

	var pin_A1 = obtener_valor("pin_A1");
	if (pin_A1 != "CONTENIDO") {
		document.getElementById("pin_A1").innerHTML = obtener_valor("pin_A1");
	}

	var pin_A2 = obtener_valor("pin_A2");
	if (pin_A2 != "CONTENIDO") {
		document.getElementById("pin_A2").innerHTML = obtener_valor("pin_A2");
	}

	var pin_PWM = obtener_valor("pin_PWM");
	if (pin_PWM != "CONTENIDO") {
		document.getElementById("pin_PWM").innerHTML = obtener_valor("pin_PWM");
	}

	var ONE_WIRE_BUS = obtener_valor("ONE_WIRE_BUS");
	if (ONE_WIRE_BUS != "CONTENIDO") {
		document.getElementById("ONE_WIRE_BUS").innerHTML = obtener_valor("ONE_WIRE_BUS");
	}

	var DHTPIN = obtener_valor("DHTPIN");
	if (DHTPIN != "CONTENIDO") {
		document.getElementById("DHTPIN").innerHTML = obtener_valor("DHTPIN");
	}

	var dataPin = obtener_valor("dataPin");
	if (dataPin != "CONTENIDO") {
		document.getElementById("dataPin").innerHTML = obtener_valor("dataPin");
		document.getElementById("clockPin").innerHTML = obtener_valor("clockPin");
	}

	var coma = obtener_valor("coma");
	if (coma != "CONTENIDO") {
		document.getElementById("coma").innerHTML = obtener_valor("coma");
	}

	var wireBegin = obtener_valor("wireBegin");
	if (wireBegin != "CONTENIDO") {
		document.getElementById("wireBegin").innerHTML = obtener_valor("wireBegin");
		document.getElementById("br").innerHTML = obtener_valor("br");
	}
}

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
		var style = document.getElementById(x[i].id).style;
		style.webkitTransform = style.webkitTransform ? "" : "scale(1)";
	}
},500);

var interval = setInterval(function() {
    if (document.readyState == 'complete') {
        var valor = obtener_valor("verinfo");
		if (valor != "CONTENIDO") {
			var element = document.getElementById(valor);
			element.scrollIntoView();
			clearInterval(interval);
		}
    }    
}, 1500);