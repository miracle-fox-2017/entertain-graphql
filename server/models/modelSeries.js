const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const seriesSchema = new Schema({
  title: String,
  overview: String,
  poster_path: String,
  popularity: String,
  tag: [
    {
      type: String
    }
  ]
})

const Series = mongoose.model('Tvseries', seriesSchema)

module.exports = Series