   /*requestAnimationFrame() and  cancelAnimationFrame()*/
	
		window.requestAFrame = (function () {
			return window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					// if all else fails, use setTimeout
					function (callback) {
						return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
					};
		})();
		window.cancelAFrame = (function () {
			return window.cancelAnimationFrame ||
					window.webkitCancelAnimationFrame ||
					window.mozCancelAnimationFrame ||
					window.oCancelAnimationFrame ||
					function (id) {
						window.clearTimeout(id);
					};
		})();
		
	/*window focus*/
	
		this.setFocusEvents=function(){
			active_element = document.activeElement;
			if (document.all)	{
				document.onfocusout = function() {	that.focus=false;     };
				document.onfocusin = function()	 {	that.focus=true;       };
			}	else	{
				window.onblur = function()	  {	that.focus=false;            };
				window.onfocus = function()	 {	that.focus=true;       };
			}
		}();
		
	/*  time1 control status delect  */
	