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
			
			//request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			request.overrideMimeType("application/json");
			request.send();
		}	
	}
}();

/*var app = {
	tab:null,
	getLero:function(tab){
		app.tab = tab;
		//chrome.browserAction.setBadgeText({text: 'load'}); 
		//chrome.extension.getURL('app.html')
		//alert("");
		//Ajax.get('http://geradordelerolero.herokuapp.com/generate', app.glue);
		
		//chrome.browserAction.setPopup({popup:"app.html"});
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
}*/

/*var loadLero = function(){
	var popups = chrome.extension.getViews({type: "popup"});
	
	if( popups.length != 0 ){
		var popup = popups[0];
			popup.document.getElementById("content").innerHTML = "Henrique Meu chapa.";
	}
	
	//chrome.browserAction.onClicked.addListener(app.getLero);
}*/

var app = {
	o:null,
	init:function(){
		document.getElementById('news').addEventListener('click', app.news, false);
		document.getElementById('copy').addEventListener('click', app.copy, false);
		
		app.news();
	},
	copy:function(){
		document.getElementById("text-hide").select();
		document.execCommand("Copy", false, null);
		
	},
	news:function(){
		Ajax.get('http://geradordelerolero.herokuapp.com/generate', function(r){
			app.o = r;
			app.display();
		});
	},
	display:function(){
		document.getElementById('text-view').innerHTML = app.o.text;
		document.getElementById('text-hide').value = app.o.text;
	}
}

document.addEventListener('DOMContentLoaded', app.init);