const new = require("../Models/new");

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

module.exports = function(app){

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
				res.send(req.file.filename);
			}
		})
	})
}