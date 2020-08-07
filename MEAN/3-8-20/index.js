class ABC{

	constructor(name){
		this.Name = name;
	}

	text(){
		return "toi ten:" + this.Name;
	}
}

class lopcon extends ABC{
	constructor(name , model){
		super(name);
		this.Model = model;
	}
}

var kq = new lopcon('the',24,'model');

console.log(kq.text());
