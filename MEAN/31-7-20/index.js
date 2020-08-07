class admin{
	//static chỉ có thể dùng được khi chính thằng cha gọi nó
	//không dùng biến gọi nó chỉ có class gọi static
	static them(){
		return 'them';
	}
	xoa(){
		return 'xoa';
	}
	sua(){
		return 'sua';
	}
	xoa_1(){
		return 'xoa1';
	}
	sua_1(){
		return 'sua1';
	}
	timkiem(){
		return 'timkiem';
	}
	phantrang(){
		return 'phantrang';
	}
}

class product extends admin{
	upanh1(){
		return 'upanh1';
	}
}

class category extends product{
	sapxep(){
		return 'sap xep';
	}
}

class users extends category{
	doimatkhau(){
		return 'doimatkhau';
	}
}


var kq = new product();

//chạy vì chính cha gọi
console.log( admin.them() );

//không chạy vì thằng con gọi
console.log( kq.them() );





