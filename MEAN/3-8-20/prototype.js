function Abc(name ,age){
	this.Name = name;
	this.Age = age;
}

Abc.prototype.mota = function(){
	return this.Name + this.Age;
}

var kq = new Abc('the', 24);

console.log( kq.mota() );

function Lopcon(name,age,model){
	//gọi lớp cha
	this.super_ = Abc;
	//gọi các biến lớp con
	this.super_.call(this,name,age);
	//tạo biến mới
	this.Model = model;
}

inherits(Lopcon, Abc);

function inherits(child, parent) {
    child.prototype = Object.create(parent.prototype, {
        constructor: {
        value: child,
        enumerable: false,
        writable: true,
        configurable: true
        }
    });
}