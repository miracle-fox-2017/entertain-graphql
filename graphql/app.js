const app = require('express')()
const graphqlHTTP = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat
} = require('graphql');
const logger = require('morgan')

const MoviesModel = require('./Model')

const MoviesType = new GraphQLObjectType({
  name: 'Movies',
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    overview: {type: GraphQLString},
    popularity: {type: GraphQLFloat},
    poster_path: {type: GraphQLString},
    status: {type: GraphQLString},
    tag: {type: GraphQLString}
  }
})

const MovieInputType = new GraphQLInputObjectType({
  name: 'MovieInput',
  fields: {
    title: {type: GraphQLString},
    overview: {type: GraphQLString},
    popularity: {type: GraphQLFloat},
    poster_path: {type: GraphQLString},
    status: {type: GraphQLString},
    tag: {type: GraphQLString}
  }
})

const MovieEditType = new GraphQLInputObjectType({
  name: 'MovieEdit',
  fields: {
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    overview: {type: GraphQLString},
    popularity: {type: GraphQLFloat},
    poster_path: {type: GraphQLString},
    status: {type: GraphQLString},
    tag: {type: GraphQLString}
  }
})

const MovieDeleteType = new GraphQLInputObjectType({
  name: 'MovieDelete',
  fields: {
    _id: {type: GraphQLString}
  }
})

const AppQuery = new GraphQLObjectType({
  name: 'Hello',
  fields: {
    movies: {
      type: new GraphQLList(MoviesType),
      resolve: () =>  {
        return MoviesModel.find()
      }
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
          name: 'movie params',
          type: MovieInputType
        }
      },
      resolve: async (root, args) => {
        const {movieParam} = args
        await MoviesModel.create(movieParam)
        let movie = await MoviesModel.find()
        return movie
      }
    },
    editMovie: {
      type: new GraphQLList(MoviesType),
      args: {
        editMovie: {
          name: 'edit movie',
          type: MovieEditType
        }
      },
      resolve: async (root, args) => {
        const {editMovie} = args
        const id = editMovie._id
        await MoviesModel.update({_id: id}, {
          title: editMovie.title,
          overview: editMovie.overview,
          popularity: editMovie.popularity,
          tag: editMovie.tag,
          poster_path: editMovie.poster_path,
          status: editMovie.status
        })
        let dataMovie = await MoviesModel.find()
        return dataMovie
      }
    },
    deleteMovie: {
      type: new GraphQLList(MoviesType),
      args: {
        removeMovie: {
          name: 'removeMovie',
          type: MovieDeleteType
        }
      },
      resolve: async (root, args) => {
        const {removeMovie} = args
        const id = removeMovie._id
        await MoviesModel.findByIdAndRemove(id)
        let movies = await MoviesModel.find()
        return movies
      }
    }
  }
})

const appSchema = new GraphQLSchema({
  query: AppQuery,
  mutation: AppMutation
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
