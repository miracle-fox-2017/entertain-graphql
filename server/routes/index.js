const router = require('express').Router();
const movie = require('../controllers/controllerMovie')
const Movie = require('../models/modelMovie')
const series = require('../controllers/controllerSeries')
const graphqlHTTP = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require('graphql')

const MoviesType = new GraphQLObjectType({
  name: 'Movie',
  fields: {
    _id: { type: GraphQLString, },
    title: { type: GraphQLString, },
    overview: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    popularity: { type: GraphQLString }
  }
})
const MoviesInputType = new GraphQLInputObjectType({
  name: 'AddMovie',
  fields: {
    _id: { type: GraphQLString, },
    title: { type: GraphQLString, },
    overview: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    popularity: { type: GraphQLString }
  }
})
const MoviesRemoveType = new GraphQLInputObjectType({
  name: 'DelMovie',
  fields: {
    _id: { type: GraphQLString, }
  }
})
const MoviesEditType = new GraphQLInputObjectType({
  name: 'EditMovie',
  fields: {
    _id: { type: GraphQLString, },
    title: { type: GraphQLString, },
    overview: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    popularity: { type: GraphQLString }
  }
})

const SeriesType = new GraphQLObjectType({
  name: 'Series',
  fields: {
    title: { type: GraphQLString, },
    overview: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    popularity: { type: GraphQLString }
  }
})

const SeriesInputType = new GraphQLInputObjectType({
  name: 'AddSeries',
  fields: {
    title: { type: GraphQLString, },
    overview: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    popularity: { type: GraphQLString }
  }
})

const AppQuery = new GraphQLObjectType({
  name: 'appQuery',
  fields: {
    movies: {
      type: new GraphQLList(MoviesType),
      resolve: () => movie.getDataMovie().then(data => {
        return data
      })
    },
    series: {
      type: new GraphQLList(SeriesType),
      resolve: () => series.getDataSeries().then(data => {
        return data
      })
    }
  }
})

const AppMutation = new GraphQLObjectType({
  name: 'appMutation',
  fields: {
    addMovie: {
      type: new GraphQLList(MoviesType),
      args: {
        movieParam: {
          name: 'Movie Param',
          type: MoviesInputType
        }
      },
      resolve: async (root, args) => {
        const { movieParam } = args
        await movie.saveMovie(movieParam)
        // await Movie.create(movieParam)
        return await Movie.find()
      },
    },
    delMovie: {
      type: new GraphQLList(MoviesType),
      args: {
        movieParam: {
          name: 'Movie Remove Param',
          type: MoviesRemoveType
        }
      },
      resolve: async (root, args) => {
        const { movieParam } = args
        await movie.delMovie(movieParam)
        return await Movie.find()
      },
    },
    editMovie: {
      type: new GraphQLList(MoviesType),
      args: {
        movieParam: {
          name: 'Movie Edit Param',
          type: MoviesEditType
        }
      },
      resolve: async (root, args) => {
        const { movieParam } = args
        await movie.editMovie(movieParam)
        return await Movie.find()
      },
    },
  }
})
const appSchema = new GraphQLSchema({
  query: AppQuery,
  mutation: AppMutation
})

router.use('/graphql', graphqlHTTP({
  schema: appSchema,
  graphiql: true
}))

module.exports = router