import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import {
  Platform,
  StyleSheet,
  View,
  Button
} from 'react-native';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import AddBook from './AddBook'
import EditBook from './EditBook'

class ListBook extends Component {

  constructor() {
    super()
    this.state = {
      counter: 0,
      books: []
    }
  }

  componentWillMount() {
    const {refetch} = this.props.data
    refetch()
    this.setState({
      books: this.props.data.books
    })
  }

  deleteBook(book) {
    console.log('yeah', book)
    this.props.deleteBooksMutation({
      variables: { id: book }
    })
      .then(({ data }) => {
        this.props.data.refetch()
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  } 

  render() {
    const { books } = this.props.data;
    const {navigate} = this.props.navigation
    return (
      <Container>
        <Header />
        <Content>
        <Button
         onPress={() => {navigate('AddBook')}}
         title="Add Book"
         />          
          <List>
            {books && books.map((book, index) => (
              <View key={index}>
                <ListItem itemHeader first>
                  <Text>{book.title}</Text>
                </ListItem>
                <ListItem >
                  <Text>isbn: {book.isbn}</Text>
                </ListItem>
                <ListItem>
                  <Text>author: {book.author}</Text>
                </ListItem>
                <ListItem>
                  <Text>category: {book.category}</Text>
                </ListItem>
                <ListItem last>
                  <Text>stock: {book.stock}</Text>
                </ListItem>
                <Button
                  onPress={() => this.deleteBook(book._id)}
                  title="delete"
                />
                <Button
                  onPress={() => {navigate('EditBook', {book: book})}}
                  title="Edit"
                />                 
              </View>
            ))}
          </List>
        </Content>
      </Container>
    )
  }
}

// const query = `
// query {
//   books {
//     _id
//     isbn
//     title
//     author
//     category
//     stock
//   }
// }
// `

// export default graphql(gql`${query}`)(ListBook);

const booksQuery = gql`
query {
  books {
    _id
    isbn
    title
    author
    category
    stock
  }
}
`;

const deleteBooksMutation = gql`
mutation delete($id:String) {
  deleteBook(bookParam: {
    id: $id
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
  graphql(booksQuery),
  graphql(deleteBooksMutation, {name: 'deleteBooksMutation'})
)(ListBook);