const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType
} = require('graphql')

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: {
    poster_path: { type: GraphQLString },
    overview: { type: GraphQLString },
    title: { type: GraphQLString },
    popularity: { type: GraphQLString },
  }
})

const MovieInputType = new GraphQLInputObjectType({
  name: 'MovieInput',
  fields: {
    poster_path: { type: GraphQLString },
    overview: { type: GraphQLString },
    title: { type: GraphQLString },
    popularity: { type: GraphQLString },
  }
})

module.exports = {
  MovieType,
  MovieInputType
}