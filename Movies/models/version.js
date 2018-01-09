const mongoose = require('mongoose').connect('mongodb://localhost:27017/movieVersion');
const Schema = mongoose.Schema

const versionSchema = new Schema({
	name: String,
	version: Number
})

const versionModel = mongoose.model('version', versionSchema);

module.exports = versionModel