//https://developer.chrome.com/extensions/xhr
var Ajax = function(){
	var request = new XMLHttpRequest();
	return {
		get:function(url, callback){
			request.open('get', url, true);
			request.onreadystatechange= function(r){
				if( request.readyState == 4 ){
					if( request.status == 200 ){
						callback(JSON.parse(request.responseText))
					}
				}
            };
			
			request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			request.overrideMimeType("application/json");
			request.send();
		}	
	}
}();

var app = {
	getLero:function(){
		// document.body.style.backgroundColor="red";
		console.log(document.domain); 
		//console.log(window.location);
		// Ajax.get('http://geradordelerolero.herokuapp.com/generate', app.glue);
	},
	glue:function(r){
		console.log(window.location);
	}
}

chrome.browserAction.onClicked.addListener(app.getLero);