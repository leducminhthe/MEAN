var b = require('./index');
console.log(b);

var buffer = new Buffer("NodeJS", "utf-8");
//kiểm tra dạng buffer

//đã có buffer
console.log(buffer.toString());

//gửi = json
console.log(buffer.toJSON());

var fs = require("fs");
var noidung = fs.readFileSync( __dirname + "/index.txt");
var html = fs.readFileSync( __dirname + "/index.html");

console.log(noidung);
console.log(noidung.toString());

console.log(html.toString());

var http = require("http");
//req nhận yêu cầu khách hàng, res trả về cho khách hàng
http.createServer(function(req , res){
	res.writeHead(200, {"Content-Type":"text/html"});
	var noidung = fs.readFileSync( __dirname + "/index.html", "utf-8");
	noidung = noidung.replace("Name", "KhoaPham");
	res.end(noidung);
}).listen(8888);