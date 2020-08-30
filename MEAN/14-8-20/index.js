var express = require('express');
var app = express();
app.listen(3000);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

app.get('', function( req, res ){
	res.send('hello');
})

app.get('/param/:id',function(req,res){
	var id = req.params.id;
	res.send('hello:'+ id );
})

app.post('/post',function(req,res){
	var a = req.body.username;
	res.send('hello:'+ ' ' + a);
})