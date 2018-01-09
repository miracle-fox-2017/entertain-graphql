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
    id : {type : GraphQLString},
    title : {type : GraphQLString},
    overview : {type : GraphQLString},
    posterPath : {type : GraphQLString},
    popularity : {type : GraphQLInt},
    tag : {type : new GraphQLList(GraphQLString)}
  }
});

const movieCreateInput = new GraphQLInputObjectType({
  name : 'movieCreateInput',
  fields : {
    title : {type : GraphQLString},
    overview : {type : GraphQLString},
    posterPath : {type : GraphQLString},
    popularity : {type : GraphQLInt},
    tag : {type : new GraphQLList(GraphQLString)}
  }
});

const movieDelete = new GraphQLInputObjectType({
  name : 'movieDelete',
  fields : {
    id : {type : GraphQLString}
  }
})

module.exports = {
  movieType,
  movieCreateInput,
  movieDelete
};
