const mongoose =  require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
  name: {type: String },
  overview: {type: String },
  popularity: {type: String },
  poster_path: {type: String },
  title:{type: String },
  tag:{type: String },
  status: {type: String }
})

const modelMovie = mongoose.model('Movie',movieSchema)
module.exports = modelMovie;
