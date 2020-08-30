var express = require('express');
var app = express();
app.listen(3000);
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/middleware/:id',function(req,res, next){
	var i = req.params.id;
	if (i == 1) {
		res.end('wrong');
	}else{
		next();
	}
}, function( req, res){
	res.send('ok');
});

//cookie: tạo, sử dụng, xóa
//khi login -> tạo cookie
//khi vào module -> sử dụng cookie để xét
//cho ng sử dụng vào module hay ko
//logout

//tạo cookie
app.get('/createCookie', (req, res)=>{
	//res.cookie(ten, gia tri, thuoc tinh)
	res.cookie('name', 'lethe' , {maxAge: 1000 * 120 } ).end('create success');
});

//dùng cookie
app.get('/useCookie', (req,res)=>{
	res.end( req.cookies.name );
})

//xóa cookie
app.get('/deleteCookie', (req,res)=>{
	res.clearCookie('name');
	res.send('Cookie delete');
});