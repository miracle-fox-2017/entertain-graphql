const {
  GraphQLObjectType,
  GraphQLList
} = require('graphql');

const Movie = require('../model/modelMovie');

const {
  movieType,
  movieInput
} = require('./movie');

const query = new GraphQLObjectType({
  name : 'Query',
  fields : {
    movie : {
      type : new GraphQLList(movieType),
      resolve : async () => {
        const movies = await Movie.find()
        return movies
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name : 'Mutation',
  fields : {
    addMovie : {
      type : new GraphQLList(movieType),
      args : {
        movieParam : {
          name : 'MovieParam',
          type : movieInput
        }
      },
      resolve : async (root,args) => {
        const {movieParam} = args;
        await new Movie({
          title : movieParam.title,
          overview : movieParam.overview,
          poster_path : movieParam.posterPath,
          popularity : movieParam.popularity,
          tag : movieParam.tag
        }).save();
        const movies = await Movie.find()
        return movies
      }
    }
  }
});

module.exports = {
  mutation,
  query
};
