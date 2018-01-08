const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const profileSchema = new Schema({
  firstName: String,
  lastName: String,
  address: String
})

const Profile = mongoose.model('students', profileSchema)

module.exports = Profile