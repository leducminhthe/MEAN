var buffer = new Buffer("NodeJS", "utf-8");
console.log(buffer);
console.log(buffer.toString());
console.log(buffer.toJSON());

//module fs có sẵn đọc 1 file và up trên server
//dirname hằng số đường dẫn tới file
var fs = require("fs");
var noidung = fs.readFileSync( __dirname + "/danhsach.txt");
console.log(noidung);
console.log(noidung.toString());
console.log(noidung.toJSON());