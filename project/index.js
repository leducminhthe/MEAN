var express = require("express");
var app = express();
// var server = require("http").createServer(app);
app.listen(3000);

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// cấu hình ejs
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/trangchu", function(req, res){
	// res.send("<font color=red>HELLO WORLD<font>");
	res.render("trangchu");
});

app.post("/post", urlencodedParser, function(req, res){
	res.send('welcome, ' + req.body.username);
})

app.get("/get/:id", function(req, res){
	res.send("<font color=red>"+ id +"<font>");
});
