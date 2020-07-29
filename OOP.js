var a = {
	ho: "Le",
	ten: "The",
	hovaten: function(){
		console.log(this.ho + this.ten);
	}
}

a.hovaten();
 console.log(a["ten"]);

 function KhoaHoc(ten,hocphi){
 	this.Ten = ten;
 	this.HocPhi = hocphi
 }

 KhoaHoc.prototype.mota = function(){
 	console.log('Hello welcome to :' + this.Ten + " " + this.HocPhi );
 }

var nodejs = new KhoaHoc('NodeJs', 1000000);

for(var array in nodejs){
	console.log( array);
}


