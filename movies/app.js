const express  = require('express');
const mongoose = require('mongoose');
const logger   = require('morgan')
const bodyParser = require('body-parser');
const cors      = require('cors');
const app      = express();

mongoose.connection.openUri('mongodb://127.0.0.1:27017', (err) => {
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