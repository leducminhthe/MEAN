var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.listen(3000);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://lethe:lethe123@cluster0.owdk1.gcp.mongodb.net/BookShop?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
	if (!err) {
		console.log('success connect');
	} else {
		console.log('false');
	}
});

// password admin using bycrypt
const bcrypt = require('bcrypt');
//độ băm password
const saltRounds = 10;

// jsonwebtoken
var jwt = require('jsonwebtoken');
var secret = "lethe*rz8s?bu{B$C!fE&4";

// express-session
var session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use(session({ secret: 'fdRk$pdt-J8NMmyT', cookie: { maxAge: 6000000 } }));


// upload image
// multer
var multer = require('multer');
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/upload')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname)
	}
});
var upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {
		console.log(file);
		if (file.mimetype == "image/bmp" ||
			file.mimetype == "image/png" ||
			file.mimetype == "image/gif" ||
			file.mimetype == "image/jpg" ||
			file.mimetype == "image/jpeg"
		) {
			cb(null, true)
		} else {
			return cb(new Error('Only image are allowed!'))
		}
	}
}).single("fileImage");

// models
const Category = require("./Models/category.js");
const Book = require("./Models/book.js");
const User = require("./Models/user.js");

// category
app.get("/page/category", function (req, res) {

	Category.find(function (err, items) {
		if (err) {
			console.log(err);
			res.render("home", { page: "category", cate: [] });
		} else {
			res.render("home", { page: "category", cate: items });
		}
	});
})


app.post("/page/category", function (req, res) {
	var category = new Category({
		title: req.body.txtTitle,
		ordering: req.body.txtOrdering,
		active: req.body.select,
		book_id: []
	});
	category.save(function (err) {
		if (err) {
			console.log('save false');
			res.render("home", { page: "category", message: "Save false" });
		} else {
			console.log('save success');
			Category.find(function (err, items) {
				if (err) {
					console.log(err);
					res.render("home", { page: "category", cate: [] });
				} else {
					res.render("home", { page: "category", cate: items, message: "Save succes" });
				}
			});
		}
	})
})

app.get("/category/delete/:id", function (req, res) {
	Category.findByIdAndDelete(req.params.id, function (err, data) {
		if (err) {
			res.json({ kq: 0 });
		} else {
			res.redirect("/page/category");
		}
	})
})

// book
app.get("/page/book", function (req, res) {
	Category.find(function (err, items) {
		if (err) {
			console.log(err);
			res.render("home", { page: "book", cate: [] });
		} else {
			res.render("home", { page: "book", cate: items });
		}
	});
})

app.post("/page/book", function (req, res) {
	upload(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			console.log("A Multer error occurred when uploading.");
			res.json({ kq: 0 });
		} else if (err) {
			console.log("An unknown error occurred when uploading." + err);
			res.json({ kq: 0 });
		} else {
			console.log("Upload is okay");
			console.log(req.file); // Thông tin file đã upload

			// save book
			var book = new Book({
				title: req.body.txtTitle,
				image: req.file.filename,
				file: req.body.txtPdf,
				description: req.body.txtDes,
				ordering: req.body.txtOrdering,
				active: req.body.select
			})
			book.save(function (err) {
				if (err) {
					console.log('save false');
					res.render("home", { page: "book", message: "Save false" });
				} else {
					Category.findOneAndUpdate({ _id: req.body.selectCate }, { $push: { book_id: book._id } }, function (err) {
						if (err) {
							res.json({ kq: 0, Err: err });
						} else {
							console.log('book is okay');
							res.redirect("/page/book");
						}
					});
				}
			})
		}
	});
})

// home
app.get("/", function (req, res) {
	checToken(req, res);
});

app.get("/login", function (req, res) {
	res.render("login");
});

app.post("/login", function (req, res) {
	User.findOne({ email: req.body.email }, function (err, item) {
		if (!err && item != null) {
			console.log(req.body.password + "" + item.password);
			bcrypt.compare(req.body.password, item.password, function (err2, res2) {
				if (res2 == false) {
					res.json({ kq: 0, err: "wrong password" });
				} else {
					jwt.sign(item.toJSON(), secret, { expiresIn: "168h" }, function (err, token) {
						if (err) {
							res.json({ kq: 0, err: "Token generate err:" + err })
						} else {
							req.session.token = token;
							res.json({ token: token });
						}
					});
				}
			});
		} else {
			res.json({ kq: 0, err: "wrong email" });
		}
	})
});

function checToken(req, res) {
	if (req.session.token) {
		jwt.verify(req.session.token, secret, function (err, decoded) {
			if (err) {
				res.send("wrong");
			} else {
				res.json(decoded);
			}
		});
	} else {
		res.send('not login');
	}
}

app.post("/addUser", function (req, res) {
	//using bycrypt
	bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
		let admin = new User({
			username: req.body.username,
			email: req.body.email,
			password: hash,
			level: req.body.level
		})
		admin.save(function (err, data) {
			if (err) {
				res.json({ kq: 0, Err: err });
			} else {
				res.json({ kq: 1, data })
			}
		})
	});
});

app.get("/home", function (req, res) {
	res.render("home", { page: "home" });
});
