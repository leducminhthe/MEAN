
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){
	app.get("/trangchu/:id", function(req, res){
		res.render("trangchu", { id: req.params.id });
	});

	app.post("/post", urlencodedParser, function(req, res){
		res.send('welcome, ' + req.body.username + req.body.password);
	})
}