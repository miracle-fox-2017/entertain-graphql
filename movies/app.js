const express  = require('express');
const mongoose = require('mongoose');
const logger   = require('morgan')
const bodyParser = require('body-parser');
const cors      = require('cors');
const app      = express();

mongoose.connection.openUri('mongodb://nahtanoy:132435@phase2-shard-00-00-fjtwn.mongodb.net:27017,phase2-shard-00-01-fjtwn.mongodb.net:27017,phase2-shard-00-02-fjtwn.mongodb.net:27017/test?ssl=true&replicaSet=PHASE2-shard-0&authSource=admin', (err) => {
  if (err) console.log('Database Not Connected');
  console.log('Database Connected');
})

const movies = require('./routes/movies')

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/movies', movies)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3001, () => console.log('Example app listening on port 3001!'))
