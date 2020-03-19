<script type="text/javascript">
			document.oncontextmenu = function(){return false;}
			function disabletext(e){
				return false
			}
			function reEnable(){
				return true
			}
			document.onselectstart=new Function ("return false")
			if (window.sidebar){
				document.onmousedown=disabletext
				document.onclick=reEnable
			}
		</script>