require('dotenv').config()

const mongoose = require('mongoose').connect(process.env.DB_URL);
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRoute = require('./routes/indexRoute');
const movieRoute = require('./routes/movieRoute');
const movieModel = require('./models/movieModel');

const app = express();

const graphQLHTTP = require('express-graphql');
const {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLSchema,
} = require('graphql');

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: {
    _id: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    overview: {
      type: GraphQLString,
    },
  },
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: new GraphQLList(MovieType),
      resolve: async () =>  {
        const movies = await movieModel.find({});

        return movies
      }
    }
  },
});

const MovieInputType = new GraphQLInputObjectType({
  name: 'MovieInputType',
  fields: {
    overview: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    }
  }
})

const MovieInputUpdateType = new GraphQLInputObjectType({
  name: 'MovieInputUpdateType',
  fields: {
    id: {
      type: GraphQLString,
    },
    overview: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    }
  }
})

const MovieInputDeleteType = new GraphQLInputObjectType({
  name: 'MovieInputDeleteType',
  fields: {
    id: {
      type: GraphQLString,
    }
  }
})

// then, we need the mutation
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        input: {
          name: 'input',
          type: MovieInputType,
        }
      },
      resolve: async (root, args) => {
        const {
          input
        } = args;


        let newMovie = new movieModel({
          title: input.title,
          overview: input.overview,
        })

        await newMovie.save()

        return newMovie;
      }
    },
    updateMovie: {
      type: MovieType,
      args: {
        input: {
          name: 'input',
          type: MovieInputUpdateType,
        }
      },
      resolve: async (root, args) => {
        const {
          input
        } = args;


        const editMovie = await movieModel.findById(input.id)
        editMovie.title = input.title;
        editMovie.overview = input.overview;

        const editedMovie = await editMovie.save()
        return editedMovie
      }
    },
    deleteMovie: {
      type: MovieType,
      args: {
        input: {
          name: 'input',
          type: MovieInputDeleteType,
        }
      },
      resolve: async(root, args) => {
        const {
          input
        } = args;

        const deletedMovie = await movieModel.findByIdAndRemove(input.id)

        return deletedMovie;
      }
    }
  }
})

const appSchema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

app.use('/graphql', graphQLHTTP({
  schema: appSchema,
  graphiql: true,
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute);
app.use('/movie', movieRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
