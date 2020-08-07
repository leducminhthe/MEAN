const mongoose = require('mongoose');

const cap1Schema = new mongoose.Schema({
	name: String,
	kids: [{type:mongoose.Schema.Types.ObjectId}],
});

//Cap1 được lưu trên model mongo dưới dạng thường nen đặt tên thường
module.exports = mongoose.model("cap1", cap1Schema);