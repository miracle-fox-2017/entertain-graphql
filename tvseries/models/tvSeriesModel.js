const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tvseriesSchema = new Schema({
      title: String,
      overview: String,
      poster_path: String,
      popularity: String,
      tag: [],
      status: String
})

const tvSeries = mongoose.model('tvSeries', tvseriesSchema);

module.exports = tvSeries
