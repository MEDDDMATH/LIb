	/*alert information*/
	
		function showAlert(msg,noclear){
			
			var $alert = $(".alert");
			var $body = $("body");
			if($alert.length===0){
				$body.append("<div class='alert'></div>");
				$alert = $(".alert");
				$alert.css("border","2px dotted yellow");
				$alert.css("backgound-color","#fff");
				$alert.css("position","absolute");
				$alert.css("max-width",$body.width()+"px");
				$alert.css("left","0px");
				$alert.css("top","0px");
			}
			$alert.hide();
			if(($alert.height() > $("#bg_1024").height())&&(!noclear)){
				$alert.html(msg);
			}else{
				$alert.append("<br>"+msg);
			}
			$alert.show();
			
		}