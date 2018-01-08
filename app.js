const app = require('express')();
const mongoose = require('mongoose');
const graphQlHttp = require('express-graphql');
const {GraphQLSchema} = require('graphql');

const {
  query,
  mutation
} = require('./graphqlSchema');

mongoose.connect('mongodb://tomybudiman:400378@ecommerce-shard-00-00-l8lyw.mongodb.net:27017,ecommerce-shard-00-01-l8lyw.mongodb.net:27017,ecommerce-shard-00-02-l8lyw.mongodb.net:27017/movies?ssl=true&replicaSet=ecommerce-shard-0&authSource=admin',{
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
