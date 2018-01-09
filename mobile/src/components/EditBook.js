import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Button,
  TextInput
} from 'react-native';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import ListBook from './ListBook'

class EditBook extends Component {

  constructor() {
    super()

    this.state = {
      isbn: '',
      title: '',
      author: '',
      category: '',
      stock: 1
    }
  }

  componentDidMount() {
    var book = this.props.navigation.state.params
    console.log(book.book)
    this.setState({
      id: book.book._id,
      isbn: book.book.isbn,
      title: book.book.title,
      author: book.book.author,
      category: book.book.category,
      stock: 1
    })
  }

  edit() {
    const {navigate} = this.props.navigation
    const {editBooksMutation} = this.props
    var book = this.props.navigation.state.params.book
    console.log('adsa', book)
    console.log('ini statenya', this.state)
    editBooksMutation({
      variables: {id:this.state.id ,isbn: this.state.isbn, title: this.state.title, author: this.state.author ,category: this.state.category, stock: this.state.stock}
    })
    .then(({ data }) => {
      console.log('got data', data);
      navigate('ListBook')
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }

  render() {
    return (
      <View>
        <TextInput placeholder="ISBN" value={this.state.isbn} onChangeText={(text) => this.setState({isbn: text})}/>
        <TextInput placeholder="Title" value={this.state.title} onChangeText={(text) => this.setState({title: text})}/>
        <TextInput placeholder="Author" value={this.state.author} onChangeText={(text) => this.setState({author: text})} />
        <TextInput placeholder="Category" value={this.state.category} onChangeText={(text) => this.setState({category: text})}/>
        <Button
         onPress={() => {this.edit()}}
         title="Edit Book"
         /> 
      </View>
    )
  }
}

// const deleteBooksMutation = gql`
// mutation delete($id:String) {
//   deleteBook(bookParam: {
//     id: $id
//   }) {
//     _id
//     isbn
//     title
//     author
//     category
//     stock
//   }
// }
// `

const editBooksMutation = gql`
mutation edit($id:String, $isbn: String, $title: String, $author: String, $category: String, $stock: Int) {
  editBook(bookParam: {
    id: $id,
    isbn: $isbn,
    title: $title,
    author: $author,
    category: $category,
    stock: $stock
  }) {
    _id
    isbn
    title
    author
    category
    stock
  }
}
`

export default compose(
  graphql(editBooksMutation, {name: 'editBooksMutation'})
)(EditBook);