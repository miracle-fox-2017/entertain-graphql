const app = require('express')()
const graphql = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLInputObjectType
} = require('graphql')
const Movie = require('./models/movieModels')
const mongoose = require('mongoose')

mongoose.connection.openUri('mongodb://hary:hary@cluster0-shard-00-00-dvvn1.mongodb.net:27017,cluster0-shard-00-01-dvvn1.mongodb.net:27017,cluster0-shard-00-02-dvvn1.mongodb.net:27017/graphsql?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', (err,db) => {
  if (err) {
    console.log('TIDAK TERHUBUNG KE DATABASE');
  } else {
    console.log('DATABASE TERHUBUNG!');
  }
});

// const movieData = [
//   {
//     title: 'Insidious 5',
//     overview: 'Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, even his humanity.',
//     poster_path: '/lIv1QinFqz4dlp5U4lQ6Haisk0Z.jpg',
//     popularity: 8,
//     status: 'OK',
//     tag: 'Horor'
//   }
// ]

//movie get type
const movieType = new GraphQLObjectType({
  name: 'Movie',
  fields: {
    title: { type: GraphQLString },
    overview: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    popularity: { type: GraphQLInt },
    status: { type: GraphQLString },
    tag: {type: GraphQLString }
  }
})

//movie input type
const movieInputType = new GraphQLInputObjectType({
  name: 'MovieInput',
  fields: {
    title: { type: GraphQLString },
    overview: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    popularity: { type: GraphQLInt },
    status: { type: GraphQLString },
    tag: {type: GraphQLString }
  }
})

const movieQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movies: {
      type: new GraphQLList(movieType),
      resolve: () => {
        return Movie.find({})
      }
    }
  }
})

const movieMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createMovie: {
      type: new GraphQLList(movieType),
      args: {
        input: {
          name: 'MovieInput',
          type: movieInputType
        }
      },
      resolve: async (root,args) => {
        const { input } = args
        await Movie.create(input)
        let movieData = await Movie.find()
        return movieData
      }
    }
  }
})

const movieSchema = new GraphQLSchema({
  query: movieQuery,
  mutation: movieMutation
})


app.use('/graphql', graphql({
  schema: movieSchema,
  graphiql: true
}))

app.use('/', (req,res) => {
  res.send('SERVER JALAN BRO . . . . ')
})

app.listen(4000, () => {
  console.log('PORT 4000 SERVER ON');
})
