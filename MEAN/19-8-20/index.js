var express = require('express');
var app = express();
app.listen(3000);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "./views");

var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload')
    },
    filename: function (req, file, cb) {
    	//date.now ktra sự trùng lập
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
}).single("img");

app.get('',function(req,res){
	res.sendFile(__dirname + '/index.html');
})

app.post("/new/add", function(req, res){
    
    // res.send(name + '/' + phone + '/' + email + '/' + password);
	//upload file
	upload(req, res, function(err){
		if (err instanceof multer.MulterError){
			res.json({kq:false, errMsg: "Upload Error"});
		} else if (err) {
			res.json({kq:false, errMsg: err});
		} else {
			console.log('Upload is okay');
			res.send(req.file);

            var name = req.body.username;
            var phone = req.body.phone;
            var email = req.body.email;
            var password = req.body.password;

            console.log(name);
            console.log(phone);
            console.log(email);
            console.log(password);
		}
	})
})

