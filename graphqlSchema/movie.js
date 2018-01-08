const {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require('graphql');

const movieType = new GraphQLObjectType({
  name : 'Movie',
  fields : {
    title : {type : GraphQLString},
    overview : {type : GraphQLString},
    posterPath : {type : GraphQLString},
    popularity : {type : GraphQLInt},
    tag : {type : new GraphQLList(GraphQLString)}
  }
});

const movieInput = new GraphQLInputObjectType({
  name : 'MovieInput',
  fields : {
    title : {type : GraphQLString},
    overview : {type : GraphQLString},
    posterPath : {type : GraphQLString},
    popularity : {type : GraphQLInt},
    tag : {type : new GraphQLList(GraphQLString)}
  }
});

module.exports = {
  movieType,
  movieInput
};
