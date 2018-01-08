const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const moviesSchema = new Schema({
  title: String,
  overview: String,
  poster_path: String,
  popularity: String,
  tag: Array
})

const Movies = mongoose.model('movies', moviesSchema)

module.exports = Movies