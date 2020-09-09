const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
	title: String,
	ordering: Number,
	active: Number,
	book_id: [{type: mongoose.Schema.Types.ObjectId}],
});

module.exports = mongoose.model("Category", categorySchema);