const app =require('express')()
const mongoose = require('mongoose')
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/movies')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const indexMovie = require('./routes/movie')

app.use('/movie',indexMovie)

app.listen(3001, function(){
  console.log('Ayo lari di 3001')
})