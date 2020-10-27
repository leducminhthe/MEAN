const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min:5,
        max:205,
    },
    email: {
        type: String,
        required: true,
        min:5,
        max:205,
    },
    password: {
        type: String,
        required: true,
        min:5,
        max:205,
    }
})

module.exports = mongoose.model('User',userSchema);