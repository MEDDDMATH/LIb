	function drag(obj){
		if(this===window){
			return new drag(obj);
		}
		this.defaults = {
			type : "#bg_1024",
			sener : "",
			rotateFlag : false,		
			rotateAble : true,
			dragFlag : false,
			draggable : true,
			down : false,
			movX : 0,
			movY : 0,
			dragIdx : 0,
			heart : {x:0,y:0},
			allowHideRotateIcon:false
		}
		$.extend(this, this.defaults, obj);

		this.sener = this.type + " " + this.sener;
		var that = this,
			$sener = $(this.sener),
			$content = $(this.type); 
		
		this.rotate=function(da,o){
			if(o.constructor!=jQuery) {throw "旋转参数错误";}
			if(!o.data("angle")){
				o.data("angle",0)
			}
			if(that.rotateAble){
				var angle=o.data("angle")+da*55;
				o.data("angle",angle)
				var transformParam = [  "rotate(",angle,
									"deg) scale(1) skew(0deg) ",
									"translate(",0,"px,",0,"px)"
								 ].join(""),
					transform = {
								"transform":transformParam,
								"-webkit-transform":transformParam,
								"-ms-transform":transformParam,
								"-moz-transform":transformParam,
								"-o-transform":transformParam
								};
				o.css(transform);
			}
		}

		this.setPosition=function(x,y,o){
			if(o.constructor!=jQuery) {throw "设置定位参数错误";}
			if(o.css("position")!=="absolute"){
				o.css("position","absolute");
			}			
			var postionTemp=that.getPosition(o);
			o.css({
				left:(x+postionTemp.left)+"px",
				top:(y+postionTemp.top)+"px"
			});
		}
		this.setabsPosition=function(x,y,o){
			if(o.constructor!=jQuery) {throw "设置定位参数错误";}
			if(o.css("position")!=="absolute"){
				o.css("position","absolute");
			}			
			var postionTemp=that.getPosition(o);
			o.css({
				left:x+"px",
				top:y+"px"
			});
		}
		this.getPosition=function(o){
				if(o.constructor!=jQuery) {throw "获得定位参数错误";}
				var top =parseFloat(o.css("top"),10)||0,
					height = parseFloat(o.css("height"),10)||0,
					width = parseFloat(o.css("width"),10)||0,
					left = parseFloat(o.css("left"),10)||0;
			return {top:top,left:left,width:width,height:height}
		}
		this.getHeart=function(o) {
					if(o.constructor!=jQuery) {throw "设置中心点参数错误";}
					var temp=that.getPosition(o);
					that.heart.x=temp.left+temp.width/2;
					that.heart.y=temp.top+temp.height/2;
		}
		this.checkSener=function(target,children){
			var tempTarget;
			for(var i=0;i<$sener.length;i++){
				if(children){
					tempTarget=$sener.eq(i).find(children)[0];
				}else{
					tempTarget=$sener[i];
				}		
				if(target==tempTarget){
					that.dragIdx=i;
					return true;
				}
			}
					return false;
		};
		
		(function(){
			if(that.rotateAble){
				$sener.append("<div class='rotate_icon'></div>");
				that.getHeart($sener.eq(that.dragIdx));
				
				var rotateImage = $sener.find(".rotate_icon").css("background-image");

				if(rotateImage && (rotateImage==="none")){
					if(that.type === "#bg_1024"){
						$("head").append(["<style type='text/css'>\n",
								"#bg_1024 .rotate_icon{position:absolute;left:-10px;top:-10px;width:24px;height:24px;background-image:url(images/xuanbtn1024.png);background-position:0px 0px;}",
								"#bg_1024 .rotate_icon:hover{cursor:pointer;}",
								"#bg_1024 .rotate_icon:active{background-position:-30px 0px;}",
								"\n</style>"].join("")
						);
					}else if(that.type === "#bg_1536"){
						$("head").append(["<style type='text/css'>\n",
								"#bg_1536 .rotate_icon{position:absolute;left:-15px;top:-15px;width:36px;height:36px;background-image:url(images/xuanbtn1536.png);background-position:0px 0px;}",
								"#bg_1536 .rotate_icon:hover{cursor:pointer;}",
								"#bg_1536 .rotate_icon:active{background-position:-43px 0px;}",
								"\n</style>"].join("")
						);
					}else if(that.type === "#bg_2048"){
						$("head").append(["<style type='text/css'>\n",
								"#bg_2048 .rotate_icon{position:absolute;left:-20px;top:-20px;width:45px;height:45px;background-image:url(images/xuanbtn2048.png);background-position:4px 0px;}",
								"#bg_2048 .rotate_icon:hover{cursor:pointer;}",
								"#bg_2048 .rotate_icon:active{background-position:-38px 0px;}",
								"\n</style>"].join("")
						);
					}
				}

				//that.setabsPosition(that.heart.x,that.heart.y,$(that.sener).eq(that.dragIdx).find(".rotate_icon"))
			}
			if(that.allowHideRotateIcon){
				$.each($sener,function(idx, val){
					$sener.eq(idx).data("timeout",setTimeout(function(){
						$sener.eq(idx).find(".rotate_icon").hide();
					},10000));
				})
			}

		})()
		try{
			var webkit = parent.iWebKit||window.iWebKit;
		}catch(e){

		}	
		$content.bind("mousedown touchstart",function(e){
			e.stopPropagation();
			e.preventDefault();			
			if(e.type ==="touchstart"){
				e=e.originalEvent.touches[0];
			}
			var $tar = $(e.target);
			that.movX = e.pageX;
			that.movY = e.pageY;

			if(webkit){
				webkit.setMoved(false);
			}

			var curclass=e.target.className;
			if(/rotate_icon/g.test(curclass)){
				that.rotateFlag=true;
				that.checkSener(e.target,".rotate_icon");
			}else if(that.checkSener(e.target)){
				that.dragFlag=true;
			}
			var $cur = $sener.eq(that.dragIdx)
			if(that.allowHideRotateIcon){
				if(that.dragFlag || that.rotateFlag){
					clearTimeout($cur.data("timeout"));
					$cur.find(".rotate_icon").show();
				}
			}
			that.getHeart($cur);
			//that.setabsPosition(that.heart.x,that.heart.y,$(that.sener).eq(that.dragIdx).find(".rotate_icon"))
			that.down=true;
		})
		$content.bind("mousemove touchmove",function(e){
			e.stopPropagation();
			e.preventDefault();			
			if(e.type ==="touchmove"){
				e=e.originalEvent.touches[0];
			}
				if(webkit){
				webkit.setMoved(false);
			}
			var x=e.pageX;
			var y=e.pageY;

			if(that.rotateFlag&&that.down){
				var vertorCurMsX=x-that.heart.x;
				var vertorCurMsY=y-that.heart.y;
				var vertorMsX=that.movX - that.heart.x;
				var vertorMsY=that.movY - that.heart.y;
				var ag1=Math.atan2(vertorMsY,vertorMsX);
				var ag2=Math.atan2(vertorCurMsY,vertorCurMsX);
			//	if(ag2<0){ag2=Math.PI*2+ag2}
			//	if(ag2<0){ag2=Math.PI*2+ag2}
				var ag = ag2-ag1;
				if(ag>6){//-PI pi
					ag=Math.PI/180;
				}else if(ag<-6){
					ag=-Math.PI/180;
				}
				that.rotate(ag,$sener.eq(that.dragIdx))
			}else if(that.down&&that.draggable&&that.dragFlag){
				var MsX=x-that.movX ;
				var MsY=y-that.movY;
				that.setPosition(MsX,MsY,$sener.eq(that.dragIdx));
			}
			that.movX=x;
			that.movY=y;
		})

		$(document).bind("mouseup touchend",function(e){
			e.stopPropagation();
			e.preventDefault();			
			if(e.type ==="touchend"){
				e=e.originalEvent.touches[0];
			}

			if(webkit){
				webkit.setMoved(true);
			}

			var $cur = $sener.eq(that.dragIdx);
			if(that.allowHideRotateIcon){
				if( that.rotateFlag || that.dragFlag){
					clearTimeout($cur.data("timeout"));
					$cur.data("timeout",setTimeout(function(){
						$cur.find(".rotate_icon").hide();
					},10000));
				}
			}

			that.rotateFlag=false;
			that.down=false;
			that.dragFlag=false;
		})
		return this;
	}