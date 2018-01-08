const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movie= new Schema({
  name: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  title:String,
  tag:String,
  status: String 
})


const movSchema = mongoose.model('movSchema', movie)

module.exports = movSchema;

