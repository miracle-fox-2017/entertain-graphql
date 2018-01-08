const app = require('express')()
const mongoose = require('mongoose')
const graphqlHTTP = require('express-graphql')
const {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require('graphql')

mongoose.connect('mongodb://AhmadNizar:cBnmgEXaknFbpUNN@ahmadnizardb-shard-00-00-scdlc.mongodb.net:27017,ahmadnizardb-shard-00-01-scdlc.mongodb.net:27017,ahmadnizardb-shard-00-02-scdlc.mongodb.net:27017/dbgraphQL?ssl=true&replicaSet=AhmadNizarDB-shard-0&authSource=admin', (err) => {
  if(!err) {
    console.log('DATABASE TERHUBUNG');
  } else {
    console.log('TIDAK TERHUBUNG DATABASE');
  }
})

var Schema = mongoose.Schema
var SchoolSchema = new Schema({
  name: String,
  address: String,
  phone: String
})

var schoolModel = mongoose.model('Schools', SchoolSchema)

const schoolsData = [
  {
    name: 'SD 78 Palembang',
    address: 'Palembang',
    phone: '081279155548'
  }
]

const SchoolType = new GraphQLObjectType({
  name: 'School',
  fields: {
    name: { type: GraphQLString },
    address: { type: GraphQLString},
    phone: { type: GraphQLString}
  }
})

const SchoolInputType = new GraphQLInputObjectType({
  name: 'SchoolInput',
  fields: {
    name: { type: GraphQLString },
    address: { type: GraphQLString},
    phone: { type: GraphQLString}
  }
})

const AppQuery = new GraphQLObjectType({
  name: 'SchoolApp',
  fields: {
    schools: {
      type: new GraphQLList(SchoolType),
      resolve: () => schoolModel.find()
    }
  }
})

const AppMutation = new GraphQLObjectType({
  name: 'SchoolMutation',
  fields: {
    addSchool: {
      type: new GraphQLList(SchoolType),
      args: {
        schoolParam: {
          name: 'school param',
          type: SchoolInputType
        }
      },
      resolve: (root, args) => {
        console.log(args)
        const { schoolParam } = args
        var newSchool = new schoolModel({
          name: schoolParam.name,
          address: schoolParam.address,
          phone: schoolParam.phone
        })

        return newSchool.save()
        .then(newData => schoolModel.find())
      }
    },
    deleteSchool: {
      type: new GraphQLList(SchoolType),
      args: {
        schoolParam: {
          name: 'deletedID',
          type: SchoolInputType
        }
      },
      resolve: (root, args) => {
        console.log('masuk sini')
        console.log(args)
        const { schoolParam } = args
        console.log(schoolParam)
        return schoolModel.remove({
          name: schoolParam.name
        })
        .then(deletedData => schoolModel.find())
      }
    }
  }
})

const appSchema = new GraphQLSchema({
  query: AppQuery,
  mutation: AppMutation
})

app.use('/graphql', graphqlHTTP({
  schema: appSchema,
  graphiql: true
}))

app.use('/', (req, res) => {
  res.send('server jalan tong')
})

app.listen(3000, () => {
  console.log('jalan di tige rebu tong')
})
