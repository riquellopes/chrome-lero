//https://developer.chrome.com/extensions/xhr
"use strict";
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
	tab:null,
	getLero:function(tab){
		app.tab = tab;
		//chrome.browserAction.setBadgeText({text: 'load'}); 
		//chrome.extension.getURL('app.html')
		//alert("");
		//Ajax.get('http://geradordelerolero.herokuapp.com/generate', app.glue);

		chrome.browserAction.setPopup({popup:"app.html"});
	},
	glue:function(r){
		app.clean();
		app.sendMessage(r.text);
	},
	clean:function(){
		app.sendMessage("");
	},
	sendMessage:function(msg){
		chrome.tabs.executeScript(app.tab.id, {code:'document.getElementsByClassName( "uiTextareaAutogrow input mentionsTextarea textInput" )[0].value = "'+msg+'";'});
	}
}

chrome.browserAction.onClicked.addListener(app.getLero);