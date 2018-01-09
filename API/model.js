var mongoose = require('mongoose');
var Schema = mongoose.Schema
var bookSchema = mongoose.Schema({
  isbn: String,
  title: String,
  author: String,
  category: String,
  stock: Number
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book
