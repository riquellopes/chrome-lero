//https://developer.chrome.com/extensions/xhr
var Ajax = function(){
	var request = new XMLHttpRequest();
	return {
		get:function(url, callback){
			request.open('get', url, true);
			request.onreadystatechange= function(r){
				if( r.readyState == 4 ){
					if( r.status == 200 ){
						callback.call(r.responseText)
					}
				}
            };
			
            //request.withCredentials = true;
			request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			//request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            request.overrideMimeType("application/json");
			request.send();
		}	
	}
}();

Ajax.get('http://geradordelerolero.herokuapp.com/generate', function(r){
	//var json = JSON.parse(r);
	
	console.log(this);
});