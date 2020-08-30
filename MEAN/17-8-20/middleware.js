var express = require('express');
var app = express();
app.listen(3000);

var fs = require('fs');

app.get('',function(req, res){
	//tạo và chỉnh file
	fs.writeFile('text.txt', 'file đầu tiên', (err)=>{
		if (err) throw err;
		res.send('tạo file thành công');
	});

	
})