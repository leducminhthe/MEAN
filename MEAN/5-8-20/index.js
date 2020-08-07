//đồng bộ
function cv1(){
	console.log(1);
}

function cv2(){
	console.log(2);
}

cv1();
cv2();

//bất đồng bộ 
function cv3(){
	setTimeout(() =>{
		console.log(3);
	}, 3000);
}

function cv4(){
	console.log(4);
}

cv3();
cv4();

//dùng callback cb()
//Gọi lại là một function sẽ được thực thi sau khi một function khác đã được thực thi xong - do đó nó có tên là callback(gọi lại).
function cv5(cb){
	setTimeout(() =>{
		console.log(5);
		cb();
	}, 3000);
}

function cv6(){
	console.log(6);
}

cv5( cv6 );