const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = Schema ({
  title: String,
  overview: String,
  poster_path: String,
  status: String,
  popularity: Number,
  tag: [],
})

const Movies = mongoose.model('Movies', MovieSchema)

module.exports = Movies;