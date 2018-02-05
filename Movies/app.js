const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const graphQLHTTP = require('express-graphql');
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLInputObjectType
} = require('graphql')
const Movie = require('./models/movie');


require('dotenv').config()	

const mongoose = require('mongoose')

mongoose.connect(process.env.db,{ useMongoClient: true })


const app = express();
const cors = require('cors')
app.use(cors())

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const MovieType = new GraphQLObjectType({
	name: 'Movie',
	fields: {
		_id: {
			type: GraphQLString
		},
		poster_path: {
			type: GraphQLString
		},
		overview: {
			type: GraphQLString
		},
		title: {	
			type: GraphQLString
		},
		popularity: {
			type: GraphQLInt
		},
		tag: {
			type: GraphQLInt
		},
		version: {
			type: GraphQLInt
		}										
	}
})

const QueryType = new GraphQLObjectType({
	name: 'Query',
	fields: {
		movie: {
			type: new GraphQLList(MovieType),
			resolve: async () => {
				const movies = await Movie.find();
				return movies
			}
		}
	}
})

const MovieInputType = new GraphQLInputObjectType({
	name: 'MovieInputType',
	fields: {
		_id: {
			type: GraphQLString
		},
		poster_path: {
			type: GraphQLString
		},
		overview: {
			type: GraphQLString
		},
		title: {	
			type: GraphQLString
		},
		popularity: {
			type: GraphQLInt
		},
		tag: {
			type: GraphQLInt
		},
		version: {
			type: GraphQLInt
		}										
	}	
})

const DeleteMovieInputType = new GraphQLInputObjectType({
	name: 'DeleteMovieInputType',
	fields: {
		_id: {
			type: GraphQLString
		}
	}
})

const UpdateMovieInputType = new GraphQLInputObjectType({
	name: 'UpdateMovieInputType',
	fields: {
		_id: {
			type: GraphQLString
		},
		poster_path: {
			type: GraphQLString
		},
		overview: {
			type: GraphQLString
		},
		title: {	
			type: GraphQLString
		},
		popularity: {
			type: GraphQLInt
		},
		tag: {
			type: GraphQLInt
		},
		version: {
			type: GraphQLInt
		}		
	}
})

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
			resolve: (root, args) => {
				const { input } = args;
				let newMovie = new Movie({
					poster_path: input.poster_path,
					overview: input.overview,
					title: input.title,
					popularity: input.popularity,
					tag: input.tag,
					version: input.version
				})
				newMovie.save()
				return newMovie
			}			
		},
		deleteMovie: {
			type: MovieType,
			args: {
				input: {
					name: 'input',
					type: DeleteMovieInputType
				}
			},
			resolve: async (root,args) => {
				const { input } = args;
				const deletedMovie = await Movie.findByIdAndRemove(input._id)
				return deletedMovie
			}
		},
		updateMovie: {
			type: MovieType,
			args: {
				input: {
					name: 'input',
					type: UpdateMovieInputType
				}
			},
			resolve: async (root,args) => {
				const { input } = args;
				const movie = await Movie.findById(input._id)
				movie.set({
					poster_path: input.poster_path || movie.poster_path,
					overview: input.overview || movie.overview,
					title: input.title || movie.title,
					popularity: input.popularity || movie.popularity,
					tag: input.tag || movie.tag,
					version: input.version || movie.version	
				})		
				movie.save()
				return movie	
			}
		}
	}
})


const movieSchema = new GraphQLSchema({
	query: QueryType,
	mutation: MutationType
})

app.use('/graphql', graphQLHTTP({
	schema: movieSchema,
	graphiql: true
}))

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