const app = require('express')()
const { graphql, buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
  } = require('graphql')
const modelMovie = require('./model/movieModel')
const mongoose = require('mongoose')
const atlasURI='mongodb://chandra92:chandrabuwana92!@cluster0-shard-00-00-s0enm.mongodb.net:27017,cluster0-shard-00-01-s0enm.mongodb.net:27017,cluster0-shard-00-02-s0enm.mongodb.net:27017/graphql?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
mongoose.connect(atlasURI,(err)=>{
  if(!err){
    console.log('Database Connected')
  }else{
    console.log('database error')
  }
}) 

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: {
    _id:{type: GraphQLString},
    name: {type: GraphQLString },
    overview: {type: GraphQLString },
    popularity: {type: GraphQLString },
    poster_path: {type: GraphQLString },
    title:{type: GraphQLString },
    tag:{type: GraphQLString },
    status: {type: GraphQLString }
  }
})

const MovieInputType = new GraphQLInputObjectType({
  name :'MovieInpout',
  fields:{
    _id:{type: GraphQLString},
    name: {type: GraphQLString },
    overview: {type: GraphQLString },
    popularity: {type: GraphQLString },
    poster_path: {type: GraphQLString },
    title:{type: GraphQLString },
    tag:{type: GraphQLString },
    status: {type: GraphQLString }
  }
})

// const MovieData =[{
//   name: 'SalamanderMan',
//   overview: 'Nice' ,
//   popularity: '1' ,
//   poster_path: 'asd',
//   title: 'Film Dewasa',
//   tag: 'Menarik',
//   status: 'Jomblo'
// }]


//get
const AppQuery =  new GraphQLObjectType({
  name : 'Coba1',
  fields: {
    // entertains:{
    //   type: new GraphQLList(EntertainType),
    //   resolve : () => entertainsData
    // },
    movies:{
      type: new GraphQLList(MovieType),
      resolve: () =>{
        return modelMovie.find({})
      }       
    }
  }
})

const AppMutation = new GraphQLObjectType({
  name: 'appMutation',
  fields: {
    addMovie :{
      type: new GraphQLList(MovieType),
      args:{
        movieParam: {
          name: 'movie param',
          type: MovieInputType
        }
      },
      resolve: async (root,args) =>{
        const {movieParam } = args
        await modelMovie.create(movieParam)
        let moviePost = await modelMovie.find()
        return moviePost
      }
    },
    deleteMovie:{
      type : new GraphQLList(MovieType),
      args:{
        delParam:{
          name:'MovieDeleteType',
          type: MovieInputType
        }
      },
      resolve : (root,args)=>{
        const {delParam}= args
        const id = delParam._id
        return modelMovie.remove({_id :delParam._id})
        .then(data => modelMovie.find())
      }
    },
    editMovie:{
      type : new GraphQLList(MovieType),
      args:{
        editParam:{
          name:'MovieDeleteType',
          type: MovieInputType
        }
      },
      resolve : (root,args)=>{
        const {editParam}= args
        const id = editParam._id
        return modelMovie.update({_id :editParam._id},{
          title: editParam.title,
          name: editParam.name,
          overview: editParam.overview,
          popularity: editParam.popularity,
          poster_path: editParam.poster_path,
          tag:editParam.tag,
          status: editParam.status
        })
        .then(data => modelMovie.find())
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

app.listen(4000,()=>{
  console.log('Cie Servernya jalan')
})

