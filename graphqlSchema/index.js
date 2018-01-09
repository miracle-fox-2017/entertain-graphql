const {
  GraphQLObjectType,
  GraphQLList
} = require('graphql');
const ObjectId = require('mongoose').Types.ObjectId;

const Movie = require('../model/modelMovie');

const {
  movieType,
  movieCreateInput,
  movieDelete
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
          type : movieCreateInput
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
        return await Movie.find()
      }
    },
    deleteMovie : {
      type : new GraphQLList(movieType),
      args : {
        deleteParam : {
          name : 'DeleteParam',
          type : movieDelete
        }
      },
      resolve : async (root,args) => {
        const {deleteParam} = args;
        await Movie.deleteOne({
          _id : ObjectId(deleteParam.id)
        });
        return await Movie.find()
      }
    }
  }
});

module.exports = {
  mutation,
  query
};
