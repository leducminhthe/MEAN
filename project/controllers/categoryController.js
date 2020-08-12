const Category = require("../Models/Category");

module.exports = function(app){
	app.get("/cate/add", function(req, res){
		res.render("MasterAdmin", {page: "admin/add"});
	});

	app.post("/cate/add", function(req, res){
		var txtordering = req.body.txtordering;
		txtordering = parseInt(txtordering);

		var act = false;
		if (req.body.active) {
			act = true;
		}

		var cate = new Category({
			name: req.body.txtname,
			ordering: txtordering,
			active: act,
			kid:[],
		});
		cate.save(function(err){
			if (err) {
				res.json({kq:0});
			} else {
				res.redirect("/cate/list");
			}
		})
	});

	app.get("/cate/list", function(req, res){
		Category.find(function(err, data){
			if (err) {
				res.json({kq:0});
			} else {
				res.render("MasterAdmin", {page: "admin/list", cates:data});
			}
		});
	});

	app.get("/cate/edit/:id", function(req, res){
		Category.findById(req.params.id, function(err, data){
			if (err) {
				res.json({kq:0});
			} else {
				res.render("MasterAdmin", {page: "admin/edit", cate:data});
			}
		});
	});

	app.post("/cate/edit", function(req, res){
		var txtordering = req.body.txtordering;
		txtordering = parseInt(txtordering);

		var act = false;
		if (req.body.active) {
			act = true;
		}

		Category.findByIdAndUpdate(req.body.CateId, {
			name: req.body.txtname,
			ordering: txtordering,
			active: act, 
		}, function(err , data){
			if (err) {
				res.json({kq:0});
			} else {
				res.redirect("/cate/list");
			}
		})
	})

	app.get("/cate/delete/:id", function(req, res){
		Category.findByIdAndDelete(req.params.id, function(err, data){
			if (err) {
				res.json({kq:0});
			} else {
				res.redirect("/cate/list");
			}
		})
	})
}