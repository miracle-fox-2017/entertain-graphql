const Movie = require('../models/movie')
const {MovieType, MovieInputType} = require('./type/movie')
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLInputObjectType
} = require('graphql')

const AppQuery = new GraphQLObjectType({
  name: 'Entertainme',
  fields: {
    getMovies: {
      type: new GraphQLList(MovieType),
      resolve: async () => {
        return await Movie.find()
      }
    }
  }
})

const AppMutation = new GraphQLObjectType({
  name: 'appMutation',
  fields: {
    addMovie: {
      type: new GraphQLList(MovieType),
      args: {
        movieParam: {
          name: 'MovieParam',
          type: MovieInputType
        }
      },
      resolve: async (root, args) => {
        const { movieParam } = args
        await Movie.create(movieParam)
        return await Movie.find()
      },
    },
    deleteMovie: {
      type: new GraphQLList(MovieType),
      args: {
        movieParam: {
          name: 'MovieParam',
          type: MovieInputType
        }
      },
      resolve: async (root, args) => {
        const { movieParam } = args
        await Movie.findByIdAndRemove(movieParam.id)
        return await Movie.find()
      },
    },
  }
})

const AppSchema = new GraphQLSchema({
  query: AppQuery,
  mutation: AppMutation
})

module.exports = AppSchema