var http = require("http");
var fs = require("fs");

//req nhận yêu cầu khách hàng, res trả về cho khách hàng
http.createServer(function(req , res){
	res.writeHead(200, {"Content-Type":"text/html"});
	var noidung = fs.readFileSync( __dirname + "/index.html", "utf-8");
	noidung = noidung.replace("Name", "KhoaPham");
	res.end(noidung);
}).listen(8888);


http.createServer(function(req , res){
	res.writeHead(200, {"Content-Type":"text/html"});
	fs.createReadStream( __dirname + "/index.html", "utf-8").pipe(res);
}).listen(7777);


http.createServer(function(req , res){
	res.writeHead(200, {"Content-Type":"application/json"});
	
	var obj = {
		ho:"Le",
		ten:"The",
		namsinh:1996
	};
	res.end(JSON.stringify(obj));

}).listen(5555);

