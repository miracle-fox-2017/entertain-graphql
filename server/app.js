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
const User = require('./models/User');
app.use(morgan('dev'))

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    address: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    createdAt: {
      type: GraphQLString
    },
  }
})

const ActionType = new GraphQLObjectType({
  name: 'Action',
  fields: {
    msg: {
      type: GraphQLString
    },
    err: {
      type: GraphQLString
    },
    data: {
      type: GraphQLString
    }
  }
})

const UserIdInputType = new GraphQLInputObjectType({
  name: 'UserId',
  fields: {
    _id: {
      type: GraphQLString
    },
  }
})

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInputType',
  fields: {
    _id: {
      type: GraphQLString
    },
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
      resolve: async () => {
        return await User.find()
      }
    },
  }
})

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: ActionType,
      args: {
        input: {
          name: 'input',
          type: UserInputType
        }
      },
      resolve: async (root, args) => {
        try {
          const newUser = {
            name: args.input.name,
            address: args.input.address,
            age: args.input.age
          }
          const user = new User(newUser)
          const createUser = await user.save()
          return {
            msg: 'success create User',
            data: createUser
          }
        } catch (err) {
          console.log(err)
          return {
            msg: 'cannot create User',
            err: err
          }
        }
      }
    },
    deleteUser: {
      type: ActionType,
      args: {
        input: {
          name: 'inputId',
          type: UserIdInputType
        }
      },
      resolve: async (root, args) => {
        try {
          console.log(args)
          await User.remove({ _id: args.input._id })
          return {
            msg: 'delete success id ' + args.input._id
          }
        } catch (err) {
          return {
            msg: 'cannot delete User ' + args.input._id,
            err: err
          }
        }
      }
    },
    editUser: {
      type: ActionType,
      args: {
        input: {
          name: 'editUser',
          type: UserInputType
        }
      },
      resolve: async (root, args) => {
        try {
          console.log(args)
          const newUser = {
            name: args.input.name,
            address: args.input.address,
            age: args.input.age
          }
          await User.update({ _id: args.input._id }, newUser)
          return {
            msg: 'update success id ' + args.input._id
          }
        } catch (err) {
          return {
            msg: 'cannot update User ' + args.input._id,
            err: err
          }
        }
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
  res.send('server running on port 4000!!!')
})

app.listen(4000, () => console.log('server running on 4000'))
