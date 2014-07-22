//声明变量
var http=require('http');

var fs=require('fs');

var path=require('path');

var mime=require('mime');

var cache={};


//发送文件数据及错误相应

function send404(response){
	response.writeHead(404,{'Content-Type':'text/plain'});
	response.write('Error 404: resoure not found.');
	response.end();
}

//文件数据服务
function sendFile(response,filePath,fileContents){
	response.writeHead(
		200,
		{'Content-Type':mime.lookup(path.basename(filePath))});
	response.end(fileContents);
}

//提供静态文件服务
function serveStatic(response,cache,absPath){
	if(cache[absPath]){							//检查文件是否缓存在内存中
		sendFile(response,absPath,cache[absPath]);//从内存中返回文件
	}else{
		fs.exists(absPath,function(exists){	//检查文件是否存在
			if(exists){
				fs.readFile(absPath,function(err,data){  //从硬盘中读取文件
					if (err) {
						send404(response);
					}else{
						cache[absPath]=data;
						sendFile(response,absPath,data);
					}
				});
			}else{
				send404(response);
			}
		});
	}
}


//创建http服务器
var server=http.createServer(function(request,response){
	var filePath=false;

	if(request.url=='/'){
		filePath='public/index.html'
	}else{
		filePath='public'+request.url;
	}

	var absPath='./'+filePath;
	serveStatic(response,cache,absPath);
});

server.listen(3000,function(){
	console.log("server listen on port 3000.");
});


//加载定制的Node模块
var chatServer=require('./lib/chat_server');
chatServer.listen(server);