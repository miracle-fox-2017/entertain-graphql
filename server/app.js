const app = require('express')()
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      index = require('./routes'),
      
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.Promise = global.Promise;
mongoose.connection.openUri('mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/entertainme?ssl=true&replicaSet=smartshop-shard-0&authSource=admin', (err) => {
  if (err) console.log('database not connected ', err)
  else console.log('database connected')
})

app.use('/', index)

app.listen(3000, () => {
  console.log('====================================')
  console.log('Running away from 3000')
  console.log('====================================')
})