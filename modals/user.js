const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    mobile: Number,
    password: String
}, 'users');

const User = mongoose.model('User', userSchema);

module.exports = User;