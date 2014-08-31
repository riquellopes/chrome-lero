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
			
			request.overrideMimeType("application/json");
			request.send();
		}	
	}
}();

var app = {
	o:null,
	init:function(){
		document.getElementById('_new').addEventListener('click', app._new, false);
		document.getElementById('copy').addEventListener('click', app._copy, false);
		
		app._new();
	},
	_copy:function(e){
		document.getElementById("text").select();
		document.execCommand("copy", false, null);
	},
	_new:function(){
		Ajax.get('http://geradordelerolero.herokuapp.com/generate', function(r){
			app.o = r;
			app.display();
		});
	},
	display:function(){
		document.getElementById('text').value = app.o.text;
		document.getElementById('number').innerHTML = app.o.share_count;
	}
}

document.addEventListener('DOMContentLoaded', app.init);