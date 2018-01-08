const app = require('express')()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const movie = require('./routes/movieRouter')


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use('/api/movie', movie)


mongoose.connection.openUri('mongodb://hary:hary@cluster0-shard-00-00-dvvn1.mongodb.net:27017,cluster0-shard-00-01-dvvn1.mongodb.net:27017,cluster0-shard-00-02-dvvn1.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', (err,db) => {
  if (err) {
    console.log('TIDAK TERHUBUNG KE DATABASE');
  } else {
    console.log('DATABASE TERHUBUNG!');
  }
});

app.listen('3001', () => {
  console.log('server 3001 jalan');
})

module.exports = app
