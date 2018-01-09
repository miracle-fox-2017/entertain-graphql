const express = require('express');
const app = express();
var bodyParser = require('body-parser')
var graphqlHTTP = require('express-graphql')
var BookSchema = require('./graphQLSchema')
var model = require('./model')


// REQUIRE Controller
var books = require('./graphQLSchema');

// BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//MONGODB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/api-crud-mongoose', (err) => {
  err ? console.log('Can\'t connect to database') : console.log('Database connected')
});

// GRAPHQL
app.use('/graphql', graphqlHTTP({
  schema: BookSchema,
  graphiql: true
}))

app.get('/data', (req, res) => {
  model.find().then((hasil) => {
    res.send(hasil)
  })
})

app.listen(3001)
