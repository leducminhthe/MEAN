var express = require('express');
var app = express();
app.listen(3000);

const session = require('express-session');

//cài
app.use( session({resave: false, saveUninitialized: true, secret:'abc', cookie: {maxAge:10000} }));

//tạo
app.get('/', function(req, res){
	req.session.Ten = {
		name: 'The'
	};
	res.send('tạo');
})

//sử dụng 
app.get('/useSession', (req , res)=>{
	res.json({ session: req.session.Ten })
})

app.get('/delete', (req,res)=>{
	delete req.session.Ten;
	res.send('xóa');
})
