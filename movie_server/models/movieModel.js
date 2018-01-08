const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
	overview:  String,
	title:   String,
});

const MovieModel = mongoose.model('Movie', movieSchema);

module.exports = MovieModel;