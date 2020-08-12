var express = require("express");
var app = express();
// var server = require("http").createServer(app);
app.listen(3000);

//CSDL MySQL
// var mysql = require("mysql");

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'dbquanlybanhang'
// })

// connection.connect();

// //o8qrbgy2zfGsOSF1

// connection.query('SELECT MaSP FROM sanpham', function (err, rows) {
//   if (err) {
//   	throw err;
//   }
//   console.log('The solution is: ', rows[4]);
// })

// connection.end()

//CSDL Mongodb using mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://lethe:o8qrbgy2zfGsOSF1@cluster0.owdk1.gcp.mongodb.net/Mongodb?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
	if (!err) {
		console.log('connect success');
	} else {
		console.log('connect fail');
	}
});
mongoose.set('useFindAndModify', false);

//cấu hình view ejs
app.set("view engine", "ejs");
app.set("views", "./views");
//css
app.use(express.static("public") );

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

//Controller
var homeController = require("./controllers/homeController");
var namsinhController = require("./controllers/namsinhController");
var categoryController = require("./controllers/categoryController");

homeController(app);
namsinhController(app);
categoryController(app);

//Model
const Cap1 = require("./Models/Cap1");
const Cap2 = require("./Models/Cap2");


app.get("/menu", function(req, res){
	var cap1 = Cap1.aggregate([{
		//lookup có 4 tham số, dùng để tìm cap1 dò cap2 
		//from: dò thằng cap2 trên database 
		//localField: tìm bên trong cap1
		//foreignField: tìm trong cap2
		//as: tên đặt chứa thằng cap2 dò đc
		$lookup:{
			from:"cap2",
			localField:"kids",
			foreignField:"_id",
			as:"Con"
		}
	}], function(err, data){
		if (err) {
			res.json({kq:0});
		} else {
			//data lấy dữ liệu do lokkup trả về dưới dạng json
			// res.json(data);
			res.render("home", {menu:data});
		}
	})
})

app.get("/sanpham",function(req, res){
	res.send('hello');
})

app.post("/themcap1", function(req, res){
	var cap1 = new Cap1({
		name: req.body.namcap1,
		kid:[],
	});

	cap1.save(function(err){
		if (err) {
			res.json({kq:0});
		} else {
			res.json({kq:1});
		}
	})
	res.render("menu");
});

app.post("/themcap2", function(req, res){
	var cap2 = new Cap2({
		name: req.body.namecap2,		
	});
	
	cap2.save(function(err){
		if (err) {
			res.json({kq:0, Err:err});
		} else {
			//findOneAndUpdate {} 1: tìm giá trị {} 2: đựa giá trị lên mongo vào giá trị tìm
			//vì kids là 1 aray nên phải dùng $push thêm phần tử
			Cap1.findOneAndUpdate({_id:req.body.idcap1}, {$push:{kids:cap2._id}}, function(err){
				if (err) {
					res.json({kq:0, Err:err});
				} else {
					res.redirect("/menu");
				}
			});
		}
	})
})

const New = require("./Models/new");

//multer
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + "-" + file.originalname)
    }
});  
var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if(	file.mimetype=="image/bmp" || 
        	file.mimetype=="image/png" ||
        	file.mimetype=="image/gif" ||
        	file.mimetype=="image/jpg" ||
        	file.mimetype=="image/jpeg" 
        ){
        	cb(null, true)
        }else{
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("fileImage");

app.get("/new/add", function(req, res){
	res.render("MasterAdmin", {page: "new/add"});
});

app.post("/new/add", function(req, res){
	//upload file
	upload(req, res, function(err){
		if (err instanceof multer.MulterError){
			res.json({kq:false, errMsg: "Upload Error"});
		} else if (err) {
			res.json({kq:false, errMsg: err});
		} else {
			console.log('Upload is okay');
			res.send(req.file);
		}
	})
})




