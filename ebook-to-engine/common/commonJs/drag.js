	function draggable(obj){
		if(this===window){
			return new draggable(obj);
		}
		this.defaults = {
			type : "#bg_1024",
			sener : "",
			down : false,
			movX : 0,
			movY : 0,
			dragIdx : 0,
			start : null,
			drag : null,
			end : null
		}
		$.extend(this, this.defaults, obj);

		this.sener = this.type + " " + this.sener;
		var that = this,
			$sener = $(this.sener),
			$content = $(this.type); 
			
		$sener.bind("mousedown touchstart",function(e){
			if(e.type === "touchstart"){
				e = e.originalEvent.touches[0];
			}
			if(window.webkit){
				webkit.setMoved(false);
			}
			e.stopPropagation();
			e.preventDefault();
			that.down=true;
			if( typeof that.start === "function" ){
					if(that.start.call(that,e,this) === false){
						that.down = false;
					}
			}
			
		})
		$content.bind("mousemove touchmove",function(e){
			if(e.type === "touchmove"){
				e = e.originalEvent.touches[0];
			}	
			e.stopPropagation();
			e.preventDefault();
			var x = e.pageX,
				 y = e.pageY;

			if(that.down){
				if( typeof that.drag === "function" ){
					if(that.drag.call(that,e,this) === false){
						that.down = false;
					}
				}
			}
			that.movX = x;
			that.movY = y;
		})
		$(document).bind("mouseup touchup",function(e){
			if(e.type ==="touchup"){
				e=e.originalEvent.touches[0];
			}
			if(window.webkit){
				webkit.setMoved(true);
			}
			e.stopPropagation();
			e.preventDefault();
			if(that.down){
				if( typeof that.end === "function" ){
					that.end.call(that,e,this)
				}
			}
			that.down=false;
			that.dragFlag=false;
		})
		return this;
	}