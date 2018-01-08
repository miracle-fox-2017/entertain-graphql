const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/entertainme', {
  useMongoClient: true,
});

const movieSchema = new Schema({
  poster_path:  String,
  overview: String,
  title:   String,
  popularity:   String,
  tag: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;