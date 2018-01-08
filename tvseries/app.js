const app = require('express')()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const tvseries = require('./routes/tvseriesRouter')


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use('/api/tvseries', tvseries)


mongoose.connection.openUri('mongodb://harynp:harynp@phase3-shard-00-00-bxpel.mongodb.net:27017,phase3-shard-00-01-bxpel.mongodb.net:27017,phase3-shard-00-02-bxpel.mongodb.net:27017/pintaran?ssl=true&replicaSet=Phase3-shard-0&authSource=admin', (err,db) => {
  if (err) {
    console.log('TIDAK TERHUBUNG KE DATABASE');
  } else {
    console.log('DATABASE TERHUBUNG!');
  }
});

app.listen('3002', () => {
  console.log('server 3002 jalan');
})
