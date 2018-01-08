const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  address: String,
  age: Number,
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;
