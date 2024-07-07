const mongoose = require('mongoose');

const loginUserSchema = new mongoose.Schema({
  mobile: Number,
  password: String
},'users');

const LoginUser = mongoose.model('users', loginUserSchema);

module.exports = LoginUser;