const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
	name: String,
	ordering: Number,
	active: Boolean,
	kids: [{type:mongoose.Schema.Types.ObjectId}], 
})
module.exports = mongoose.model("Category", categorySchema);