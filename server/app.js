
const app = require('express')(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  graphSchema = require('./graphql/schema'),
  graphqlHTPP = require('express-graphql');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'))

mongoose.Promise = global.Promise;
mongoose.connection.openUri('mongodb://amelia:amelia@cluster0-shard-00-00-71yp9.mongodb.net:27017,cluster0-shard-00-01-71yp9.mongodb.net:27017,cluster0-shard-00-02-71yp9.mongodb.net:27017/graphql?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', (err) => {
  if (err) console.log('database not connected ', err)
  else console.log('database connected')
})






app.use('/graphql', graphqlHTPP({
  schema: graphSchema,
  graphiql: true
}))

app.listen(3000)