function cv1(){
	return new Promise( (resolve, reject)=> {
		setTimeout(() => {
			resolve(1);
			console.log('cv1');
		}, 500);
	})
}

function cv2(){
	return new Promise( (resolve, reject)=> {
		setTimeout(() => {
			resolve('promise');
			console.log('cv2');
		}, 300);
	})
}

cv1()
.then( (rs) => cv2() )
.then( (rs2) => console.log(rs2) );

//công thức promise
// var a = new Promise((resolve, reject)=>{
// 	resolve(1);
// 	reject(new Error('lỗi'));
// })

// a.then( (rs) => console.log(rs) )
// .catch( (err) => console.log(err.message) ); 

//async wait
function cv3(){
	return new Promise( (resolve, reject)=> {
		setTimeout(() => {
			resolve(3);
			// console.log('cv3');
		}, 500);
	})
}

function cv4(){
	return new Promise( (resolve, reject)=> {
		setTimeout(() => {
			resolve(4);
			// console.log('cv4');
		}, 300);
	})
}

async function ketqua(){
	var kq3 = await cv3();
	var kq4 = await cv4();

	console.log(kq3);
	console.log(kq4);
}

ketqua();

