const mongoose = require('mongoose');

const cap2Schema = new mongoose.Schema({
	name: String,
});

module.exports = mongoose.model("cap2", cap2Schema);