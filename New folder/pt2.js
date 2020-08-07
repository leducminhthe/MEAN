var a = 4;
var b = 6;
var c = 1;
var delta = b*b - 4*a*c;
var kq = "";

pt2(delta);

function pt2(delta){
	if (delta < 0){
		console.log('PT vô nghiệm');
	} else if (delta == 0) {
		kq = (-b)/(2*a); 
		console.log("x1,x2=" kq);
	} else {
		var x1 = ( (-b)-Math.sqrt(delta) )/(2*a);
		var x2 = ( (-b)+Math.sqrt(delta) )/(2*a);
		console.log("x1 =" + x1 , "x2 = " + x2) 
	}
}

