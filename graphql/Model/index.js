const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connection.openUri('mongodb://nahtanoy:132435@phase2-shard-00-00-fjtwn.mongodb.net:27017,phase2-shard-00-01-fjtwn.mongodb.net:27017,phase2-shard-00-02-fjtwn.mongodb.net:27017/test?ssl=true&replicaSet=PHASE2-shard-0&authSource=admin', (err) => {
  if (err) console.log('Database Not Connected');
  console.log('Database Connected');
})

const MovieSchema = Schema({
  title: String,
  overview: String,
  poster_path: String,
  status: String,
  popularity: Number,
  tag: String,
})

const MoviesModel = mongoose.model('Movies', MovieSchema)

module.exports = MoviesModel;