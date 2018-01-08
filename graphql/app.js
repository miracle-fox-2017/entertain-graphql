const app = require('express')()
const graphqlHTTP = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql');
const logger = require('morgan');

const schoolsData = [
  {name: 'SMA Santa Maria 3', address: 'Cimahi'}
]

const SchoolType = new GraphQLObjectType({
  name: 'School',
  fields: {
    name: {type: GraphQLString},
    address: {type: GraphQLString}
  }
})

const AppQuery = new GraphQLObjectType({
  name: 'Hello',
  fields: {
    schools: {
      type: new GraphQLList(SchoolType),
      resolve: () => schoolsData
    }
  }
})

const appSchema = new GraphQLSchema({
  query: AppQuery
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
