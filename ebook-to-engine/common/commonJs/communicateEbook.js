var IconButton;
var communicateEbooknum=0;
var downFlag = false;
if(IconButton&&(!document.bind)){
	if(document.all){
		document.bind=document.attachEvent;
		document.attachEvent.arguments[1].argunments[0]=window.event;
		document.attachEvent.arguments[1].argunments[0].target=window.event.srcElement;
	}else{
		document.bind=document.addEventListener;
	}
}
if(IconButton){
	document.bind("mousedown",function(e){
		var target = e.target;
		var selfDraggable=/ui-draggable/g.test(target.className);
		var parentDraggable;
		var parentTemp=target.parentNode ;
		while(parentTemp){
			parentDraggable=/ui-draggable/g.test(parentTemp.className);
			if(parentDraggable){
				break;
			}
			parentTemp=parentTemp.parentNode ;
		}
		//alert(parentDraggable)
		if((!selfDraggable)&&(!parentDraggable)){
			downFlag =true;
			var eX = e.pageX;
			var eY = e.pageY;
			//document.body.style.cursor="url('../../../common/commonJs/drag.cur'),pointer";
			IconButton.webMousePress(eX,eY);
			//communicateEbooknum=0;
		}
	});
	document.bind("mousemove",function(e){
		if(downFlag){
			var eX = e.pageX||e.clientX;
			var eY = e.pageY||e.clientY;
			IconButton.webMouseMove(eX,eY);
		//	communicateEbooknum++;
		}
	}
	)
	document.bind("mouseup",function(e){
		var eX = e.pageX||e.clientX;
		var eY = e.pageY||e.clientY;
		downFlag = false;
		document.body.style.cursor="default";
		IconButton.webMouseRelease(eX,eY);
	}
	)
}