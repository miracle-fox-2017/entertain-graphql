const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType
} = require('graphql')

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: {
    id: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    overview: { type: GraphQLString },
    title: { type: GraphQLString },
    popularity: { type: GraphQLString },
  }
})

const MovieInputType = new GraphQLInputObjectType({
  name: 'MovieInput',
  fields: {
    id: { type: GraphQLString },
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