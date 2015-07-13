function copy_gif_show(fileDivObj, link){
	var timestamp = new Date().getTime();
	fileObj = fileDivObj.find('img');
	fileObj.attr('src', link+'?'+timestamp).show();
	fileDivObj.show();
}