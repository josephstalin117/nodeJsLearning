var flow=require('nimble')
;
flow.series([
	function(callback){
		setTimeout(function(){
			console.log('I execute first.');
			callback();
		},1000);
	},
	function(callback){
		setTimeout(function(){
			console.log('I execute next.');
			callback();
		},500);
	},
	function(callback){
		setTimeout(function(){
			console.log('I execute last.');
			callback();
		},100);
	}
]);

var hehe=function(){
	setTimeout(function(){
		console.log('wakakak~');
		callback();
	},100);
}