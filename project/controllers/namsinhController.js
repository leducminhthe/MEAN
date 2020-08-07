module.exports = function(app){
	app.get("/namsinh", function(req, res){
		res.render("namsinh", {
			namsinh:[1996,1995,1994,1993],
			hoten:"Le Duc Minh The",
			tuoi:24, 
			//req.query đưa giá trị vào spId qua trang khác
			querystring: req.query.spId,
		});
	});


	app.get("/get", function(req, res){
		var id = req.params.id;
		res.send('<link href="asset/style.css" rel="stylesheet" type="text/css">' +
			'<h1>Hello NODEJS</h1>');
	});
}