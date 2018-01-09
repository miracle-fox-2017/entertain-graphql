const app = require('express')()
const graphqlHTTP = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require('graphql')

const schoolsData = [
  {name: 'SLTA 30 Lamongan', address: 'Lamongan', phone: "9999"}
]


const SchoolType = new GraphQLObjectType({
  name: 'School',
  fields: {
    name: { type: GraphQLString, },
    address: { type: GraphQLString},
    phone: { type: GraphQLString}
  }
})

const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: {
    name: {type: GraphQLString},
    subject: {type: GraphQLString},
    age: {type: GraphQLInt}
  }
})

const StudentInputType = new GraphQLInputObjectType({
  name: 'StudentInput',
  fields: {
    name: {type: GraphQLString},
    subject: {type: GraphQLString},
    age: {type: GraphQLInt}
    createdAt: {
      type: GraphQLDate,
      resolve: () => new Date()}
  }
})
const StudentsData = [ {name: 'John Doe', subject: "Programming", age: 40} ]
const AppQuery = new GraphQLObjectType({
  name: 'Hello',
  fields: {
    schools: {
      type: new GraphQLList(SchoolType),
      resolve: () => schoolsData
    },
    students: {
      type: new GraphQLList(StudentType),
      resolve: () => {
        return StudentsData
      }
    }
  }
})

const AppMutation = new GraphQLObjectType({
  name: 'appMutation',
  fields: {
    addStudent: {
      type: new GraphQLList(StudentType),
      args: {
        schoolParam: {
          name: 'school param',
          type: StudentInputType
        }
      },
      resolve: (root, args) => {
        const { schoolParam } = args
        StudentsData.push(schoolParam)
        return StudentsData
      },
    },
  }
})

const appSchema = new GraphQLSchema({
  query: AppQuery,
  mutation: AppMutation
})
app.use('/graphql', graphqlHTTP({
  schema: appSchema,
  graphiql: true
}));

app.use('/', (req,res) => {
  res.send('server working')
})



app.listen(4000, () => {
  console.log('server starting')
})
