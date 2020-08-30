var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

var mangUser = [""];

io.on("connection", function(socket){
	console.log('user connection:' + socket.id);
	//xem server có bao nhiêu room
	console.log( socket.adapter.rooms );

	socket.on("disconnect", function(){
		console.log(socket.id + "disconnect");
	})

	//nhận data từ ng dùng
	socket.on("client-send-username", function(data){
		console.log(data + " " + socket.id);
		if (mangUser.indexOf(data) >= 0) {
			socket.emit("server-send-false");
		}else{
			mangUser.push(data);
			socket.Username = data;
			socket.emit("server-send-success", data);
			io.sockets.emit('server-send-all-user', mangUser);
		}

		//TH1: server trả về hết data cho tất cả ng dùng khi chỉ 1 ng dửi lên
		//VD: A gửi lên server, server trả về cho A,B,C,D
		//trả về toàn server
		// io.sockets.emit("server-send-data", data + "888");

		//TH2: server chỉ trả về cho ng nào gửi data lên server
		//VD: A gửi lên server, server chỉ trả về cho A
		// socket.emit("server-send-data", data + '888');

		//TH3: server trả về toàn server nhưng không trả về cho ng nào gửi data lên
		//VD: A gửi lên, server trả về cho B,C,D ko trả về A
		// socket.broadcast.emit("server-send-data", data + '888');
	})

	socket.on('logout',function(){
		mangUser.splice(
			mangUser.indexOf(socket.Username), 1
		);
		socket.broadcast.emit('server-send-all-user', mangUser);
	})

	socket.on('client-send-message',function(data){
		io.sockets.emit('server-send-message', {un:socket.Username, nd:data});
	})

	socket.on('client-take-message',function(data){
		var s = socket.Username ;
		io.sockets.emit('server-who-take-message', s);
	})

	socket.on('client-stop-message',function(data){
		io.sockets.emit('server-stop-message');
	})
});

app.get("/", function(req, res){
	res.render("trangchu");
})