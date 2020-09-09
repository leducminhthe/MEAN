const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: String,
	email: String,
	password: String,
	level: Number,
});

module.exports = mongoose.model("User", userSchema);