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

//config database mongodb
mongoose.connection.openUri('mongodb://hary:hary@cluster0-shard-00-00-dvvn1.mongodb.net:27017,cluster0-shard-00-01-dvvn1.mongodb.net:27017,cluster0-shard-00-02-dvvn1.mongodb.net:27017/graphsql?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', (err,db) => {
  if (err) {
    console.log('TIDAK TERHUBUNG KE DATABASE');
  } else {
    console.log('DATABASE TERHUBUNG!');
  }
});

//movie get type
const movieType = new GraphQLObjectType({
  name: 'Movie',
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    overview: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    popularity: { type: GraphQLInt },
    status: { type: GraphQLString },
    tag: {type: GraphQLString }
  }
})

//movie get query
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

//movie delete type
const movieDeleteType = new GraphQLInputObjectType({
  name: 'MovieDelete',
  fields: {
    _id: {
      type: GraphQLString
    }
  }
})

//movie edit type
const movieEditType = new GraphQLInputObjectType({
  name: 'MovieEdit',
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    overview: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    popularity: { type: GraphQLInt },
    status: { type: GraphQLString },
    tag: {type: GraphQLString }
  }
})

//movie mutations
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
        let movieData = await Movie.find({})
        return movieData
      }
    },
    deleteMovie: {
      type: new GraphQLList(movieType),
      args: {
        hapus: {
          name: 'MovieDelete',
          type: movieDeleteType
        }
      },
      resolve: async(root,args) => {
        const { hapus } = args
        const id = hapus._id
        await Movie.remove({_id: hapus._id})
        let movieData = Movie.find()
        return movieData
      }
    },
    editMovie: {
      type: new GraphQLList(movieType),
      args: {
        edit: {
          name: 'MovieEdit',
          type: movieEditType
        }
      },
      resolve: async (root,args) => {
        const { edit } = args
        const id = edit._id
        await Movie.update({_id: id}, {
          title: edit.title,
          overview: edit.overview,
          poster_path: edit.poster_path,
          popularity: edit.popularity,
          status: edit.status,
          tag: edit.tag
        })
        let movieData = await Movie.find()
        return movieData
      }
    }
  }
})

//movie schema query & mutations
const movieSchema = new GraphQLSchema({
  query: movieQuery,
  mutation: movieMutation
})

// config graphql
app.use('/graphql', graphql({
  schema: movieSchema,
  graphiql: true
}))

// config server awal
app.use('/', (req,res) => {
  res.send('SERVER JALAN BRO . . . . ')
})

// config listen port 4000
app.listen(4000, () => {
  console.log('PORT 4000 SERVER ON');
})
