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

class AddBook extends Component {

  constructor() {
    super()

    this.state = {
      isbn: '',
      title: '',
      author: '',
      category: '',
      stock: ''
    }
  }

  tambah() {
    const {navigate} = this.props.navigation
    const {addBookMutation} = this.props
    console.log(this.props)
    addBookMutation({
      variables: {isbn: this.state.isbn, title: this.state.title, author: this.state.author ,category: this.state.category, stock: this.state.stock}
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
        <TextInput placeholder="ISBN" onChangeText={(text) => this.setState({isbn: text})}/>
        <TextInput placeholder="Title" onChangeText={(text) => this.setState({title: text})}/>
        <TextInput placeholder="Author" onChangeText={(text) => this.setState({author: text})} />
        <TextInput placeholder="Category" onChangeText={(text) => this.setState({category: text})}/>
        <TextInput placeholder="Stock" onChangeText={(text) => this.setState({stock: text})}/>
        <Button
         onPress={() => {this.tambah()}}
         title="Add Book"
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

const addBooksMutation = gql`
mutation add($isbn: String, $title: String, $author: String, $category: String, $stock: Int) {
  addBook(bookParam: {
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
  graphql(addBooksMutation, {name: 'addBookMutation'})
)(AddBook);