const app = require('express')()
const mongoose = require('mongoose').connect('mongodb://localhost:27017/usergraphql')
const graphqlHTTP = require('express-graphql')
const morgan = require('morgan');
const {
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType
} = require('graphql')

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    name: {
      type: GraphQLString
    },
    address: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  }
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: new GraphQLList(UserType),
      resolve: () => {
        return [{name: 'capung', address: 'jakarta', age: 99}, {name: 'capung', address: 'jakarta', age: 99}]
      }
    }
  }
})

const appSchema = new GraphQLSchema({
  query: QueryType
})

app.use(morgan('dev'))

app.use('/graphql', graphqlHTTP({
  schema: appSchema,
  graphiql: true
}))

app.use('/', (req, res) => {
  res.send('server running !!!')
})

app.listen(4000, () => console.log('server running on 4000'))
