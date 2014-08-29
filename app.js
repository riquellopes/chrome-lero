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
		ZeroClipboard.setMoviePath('http://davidwalsh.name/dw-content/ZeroClipboard.swf');
		var c = new ZeroClipboard.Client();
			
			c.addEventListener('mousedown',function() {
				alert('')
				//c.setText(document.getElementById('text-hide').value);
			});
	
			c.addEventListener('complete',function(client,text) {
				alert('');
				//alert('copied: ' + text);
			});
			
			//glue it to the button
			c.glue('copy');
		//return ;
		//var c = new ZeroClipboard( document.getElementById('copy-button') );
			
			//c.on( "ready", function( readyEvent ) {
				 // alert( "ZeroClipboard SWF is ready!" );

				  //c.on( "aftercopy", function( event ) {
					// `this` === `client`
					// `event.target` === the element that was clicked
					//event.target.style.display = "none";
					//alert("Copied text to clipboard: " + event.data["text/plain"] );
					//alert('sss');
				  //});
			//});
			
		//console.log( client );
		//return ;
		//document.getElementById('_new').addEventListener('click', app._new, false);
		//document.getElementById('_copy').addEventListener('click', app._copy, false);
		
		//app._new();
	},
	_copy:function(e){
		document.getElementById("text-hide").select();
		document.execCommand("Copy", false, null);
		//copy(app.o.text);
		//console.log(app.o);
	},
	_new:function(){
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