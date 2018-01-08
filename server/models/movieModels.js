const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const movieSchema = new Schema ({
  title: { type: String },
  overview: { type: String },
  poster_path: { type: String },
  popularity: { type: Number },
  status: { type: String },
  tag: { type: String }
})

const MovieModel = mongoose.model('Movie', movieSchema)

module.exports = MovieModel
