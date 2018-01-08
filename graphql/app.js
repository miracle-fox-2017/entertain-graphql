const app = require('express')()
const axios = require('axios')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const graphqlHTTP = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require('graphql');
const logger = require('morgan');

const MovieSchema = Schema ({
  title: String,
  overview: String,
  poster_path: String,
  status: String,
  popularity: Number,
  tag: [],
})

const MoviesModel = mongoose.model('Movies', MovieSchema)

const MoviesType = new GraphQLObjectType({
  name: 'Movies',
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    overview: {type: GraphQLString},
    popularity: {type: GraphQLInt},
    poster_path: {type: GraphQLString},
    status: {type: GraphQLString}
  }
})

const AppQuery = new GraphQLObjectType({
  name: 'Hello',
  fields: {
    movies: {
      type: new GraphQLList(MoviesType),
      resolve: () =>  {
        MoviesModel.find().then(({data}) => {
          console.log(data)
          return data
        })
      }
    }
  }
})

const appSchema = new GraphQLSchema({
  query: AppQuery
})

app.use(logger('dev'));

app.use('/graphql', graphqlHTTP({
  schema: appSchema,
  graphiql:true
}))
app.use('/', (req, res) => {
  res.send('Hello Connection')
})


app.listen(4040, () => console.log('=========Connect========'))
