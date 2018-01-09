const Model = require('./model');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType
} = require('graphql');

const dataBooks = [
  {isbn: '21121', title: 'misteri kamar berhantu', author: 'wisnu', category: 'yeah', stock: 1}
]

const BookType = new GraphQLObjectType({
  name: 'BookType',
  fields: {
    _id: {type: GraphQLString},
    isbn: {type: GraphQLString},
    title: {type: GraphQLString},
    author: {type: GraphQLString},
    category: {type: GraphQLString},
    stock: {type: GraphQLInt}
  }
})

const BookInputType = new GraphQLInputObjectType({
  name: 'BookInputType',
  fields: {
    isbn: {type: GraphQLString},
    title: {type: GraphQLString},
    author: {type: GraphQLString},
    category: {type: GraphQLString},
    stock: {type: GraphQLInt}
  }
})

const BookDeleteType = new GraphQLInputObjectType({
  name: 'BookDeleteType',
  fields: {
    id: {type: GraphQLString}
  }
})

const BookEditType = new GraphQLInputObjectType({
  name: 'BookEditType',
  fields: {
    id: {type: GraphQLString},
    isbn: {type: GraphQLString},
    title: {type: GraphQLString},
    author: {type: GraphQLString},
    category: {type: GraphQLString},
    stock: {type: GraphQLInt}
  }
})

const BooksQuery = new GraphQLObjectType({
  name: 'BooksQuery',
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve: () => {
        return Model.find().then((hasil) => {
          return hasil
        })
      }
    }
  }
})


const BookMutation = new GraphQLObjectType({
  name: 'BookMutation',
  fields: {
    addBook: {
      type: new GraphQLList(BookType),
      args: {
        bookParam: {
          name: 'book param',
          type: BookInputType
        }
      },
      resolve: async (root, args) => {
        var {bookParam} = args
        await Model.create({
          isbn: bookParam.isbn,
          title: bookParam.title,
          author: bookParam.author,
          category: bookParam.category,
          stock: bookParam.stock
        })

        let dataajah = await Model.find()

        return dataajah
      }
    },

    deleteBook: {
      type: new GraphQLList(BookType),
      args: {
        bookParam: {
          name: 'book param',
          type: BookDeleteType
        }
      },
      resolve: async (root, args) => {

        console.log(args)
        var {bookParam} = args

        console.log(bookParam)
        await Model.remove({_id: bookParam.id})

        var dataajah = await Model.find()

        return dataajah
      }
    },

    editBook: {
      type: new GraphQLList(BookType),
      args: {
        bookParam: {
          name: 'book param',
          type: BookEditType
        }
      },

      resolve: async (root, args) => {
        var {bookParam} = args

        await Model.update({_id: bookParam.id}, {
          isbn: bookParam.isbn,
          title: bookParam.title,
          author: bookParam.author,
          category: bookParam.category,
          stock: bookParam.stock
        })

        var dataajah = await Model.find({_id: bookParam.id})

        return dataajah

      }
    }
  }
})

const BookSchema = new GraphQLSchema({
  query: BooksQuery,
  mutation: BookMutation
})

module.exports = BookSchema;
