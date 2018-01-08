const app = require('express')()
const mongoose = require('mongoose').connect('mongodb://localhost:27017/usergraphql')
const graphqlHTTP = require('express-graphql')
const morgan = require('morgan');
const {
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLObjectType
} = require('graphql')
app.use(morgan('dev'))

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

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInputType',
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
        return [
          {name: 'capung', address: 'jakarta', age: 99},
          {name: 'capung', address: 'jakarta', age: 99}
        ]
      }
    }
  }
})

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: new GraphQLList(UserType),
      args: {
        input: {
          name: 'input',
          type: UserInputType
        }
      },
      resolve: (root, args) => {
        console.log(args.input)
        return [args.input]
      }
    }
  }
})

const appSchema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
})

app.use('/graphql', graphqlHTTP({
  schema: appSchema,
  graphiql: true
}))

app.use('/', (req, res) => {
  res.send('server running !!!')
})

app.listen(4000, () => console.log('server running on 4000'))


// queryQL mutation createUser
// mutation{
//   createUser(input: {
//     name: "belalang",
//     address: "jakarta",
//     age: 20
//   })
//   {
//     name
//     address
//     age
//   }
// }

// queryQL query
// query{
//   user {
//     name
//     address
//     age
//   }
// }
