	function drag(obj){
		if(this===window){
			return new drag(obj);
		}
		var that = this;
		this.angle = 0;
		this.permousex = 0;
		this.permousey = 0;
		this.type = obj&&obj.type||"";
		this.sener = this.type+" "+(obj&&obj.sener);
		this.scale = obj&&obj.scale;
		var $sener = $(this.sener);
		
		this.round=function(type,obj){
				that.angle=$(that.type).data("angle")||0;
				if(type==="left"){
					if(that.angle>-180){
						that.angle-=10;
					}else{
						that.angle=0;
					}
					$(that.type).data("angle",that.angle);
					$(obj).css("transform","rotate("+that.angle+"deg) scale(1) skew(0deg) translate(0) translateZ(0)");
					$(obj).css("-webkit-transform","rotate("+that.angle+"deg) scale(1) skew(0deg) translate(0) translateZ(0)");
					$(obj).css("-ms-transform","rotate("+that.angle+"deg) scale(1) skew(0deg) translate(0) translateZ(0)");
					$(obj).css("-moz-transform","rotate("+that.angle+"deg) scale(1) skew(0deg) translate(0) translateZ(0)");
					$(obj).css("-o-transform","rotate("+that.angle+"deg) scale(1) skew(0deg) translate(0) translateZ(0)");
				}else{
					if(that.angle<180){
						that.angle+=10;
					}else{
						that.angle=0;
					}
					$(that.type).data("angle",that.angle);
					$(obj).css("transform","rotate("+that.angle+"deg) scale(1) skew(0deg) translate(0) translateZ(0)");
					$(obj).css("-webkit-transform","rotate("+that.angle+"deg) scale(1) skew(0deg) translate(0) translateZ(0)");
					$(obj).css("-ms-transform","rotate("+that.angle+"deg) scale(1) skew(0deg) translate(0) translateZ(0)");
					$(obj).css("-moz-transform","rotate("+that.angle+"deg) scale(1) skew(0deg) translate(0) translateZ(0)");
					$(obj).css("-o-transform","rotate("+that.angle+"deg) scale(1) skew(0deg) translate(0) translateZ(0)");
				}
		}
		function setPosition(obj,x,y,w,h){
				if(obj.constructor!=jQuery) return;
				if(obj.css("position")!=="absolute"){
					obj.css("position","absolute");
				}
				obj.css("left",x+"px");
				obj.css("top",y+"px");
				if(w&&h){
					obj.css("width",w+"px");
					obj.css("height",h+"px");
				}
		}
		function getPostion(element) {
					var t = element;
					var	top =parseFloat($(t).css("top"),10)||0,
						height = parseFloat($(t).css("height"),10)||0,
						width = parseFloat($(t).css("width"),10)||0,
						left = parseFloat($(t).css("left"),10)||0;

					return [left,top,width, height];
		}

		this.setRountObj=function(){
				var dragPosition=getPostion($(that.sener)[0])
				var l=dragPosition[0],
					t=dragPosition[1],
					w=dragPosition[2],
					h=dragPosition[3];
				var clickDrag=$(that.type+" "+".clickdrag")
			//	console.log(l+"l:"+w+"w"+t+"t"+h+"h")
				setPosition(clickDrag,(l-w/22),(t-h/10),w/22,h/10);
				clickDrag.show();
		};
		$(that.type+" "+".ui").append("<div class='clickdrag'></div>");

		$sener.bind("mousedown touchstart",function(e){
			e.stopPropagation();
			e.preventDefault();
			if(e.type ==="touchstart"){
				e=e.originalEvent.touches[0];
			}

			$(that.type+" "+".clickdrag").hide();
			that.mouseDown = true;	
			
			that.permousex = e.pageX;
			that.permousey = e.pageY;
			if(window.webkit){
				webkit.setMoved(false);
			}
		})
		
		$sener.bind("mousemove touchmove",function(e){
			e.stopPropagation();
			e.preventDefault();
			if(e.type ==="touchmove"){
				e=e.originalEvent.touches[0];
				that.setRountObj();
			}
			if( that.mouseDown ){
				var x = e.pageX,//-Math.cos(Math.PI*($(that.type).data("angle")||0)/180),
				y = e.pageY,
				l = parseFloat($sener.css("left"),10) ||0,		
				t = parseFloat($sener.css("top"),10) ||0;
				//console.log(x-that.permousex)
				$sener[0].style.left = (l+x-that.permousex)+"px",		
				$sener[0].style.top = (t+y-that.permousey)+"px";
				//console.log(l)
			}
			that.permousex = x;
			that.permousey = y;
		})
		$sener.bind("mouseup touchup",function(e){

			if(e.type ==="touchup"){
				e=e.originalEvent.touches[0];
			}
			that.setRountObj();
			that.mouseDown  = false;
		})
		$(document).bind("mouseup touchup",function(e){
			e.stopPropagation();
			e.preventDefault();			
			if(e.type ==="touchup"){
				e=e.originalEvent.touches[0];
			}
			if(window.webkit){
				webkit.setMoved(true);
			}
			that.setRountObj();
			that.mouseDown  = false;
		})

		$(that.type).bind("click",function(e){
			e= e || window.event;
			var curclass=e.target.className;
			//console.log(curclass)
			if(/clickdrag/g.test(curclass)){
				that.round("left",$sener);
			}
		})

		return this;
	}