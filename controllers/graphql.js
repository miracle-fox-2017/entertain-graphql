const Movie = require('../models/movie')
const AppSchema = require('../graphql/schema')
const graphqlHTTP = require('express-graphql')

module.exports = graphqlHTTP({
  schema: AppSchema,
  graphiql: true
})
