const app = require('express')();
const mongoose = require('mongoose');
const graphQlHttp = require('express-graphql');
const {GraphQLSchema} = require('graphql');

const {
  query,
  mutation
} = require('./graphqlSchema');

mongoose.connect('mongodb://127.0.0.1:27017/movie',{
  useMongoClient : true
});

app.get('/',(req,res) => {
  res.send('Server Ready!');
});

const appSchema = new GraphQLSchema({
  query : query,
  mutation : mutation
});

app.use('/graphql',graphQlHttp({
  schema : appSchema,
  graphiql : true
}));

const listener = app.listen(process.env.PORT || '3000',() => {
  console.log('Server started at port',listener.address().port);
});
