/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import ListBook from './src/components/ListBook'
import AddBook from './src/components/AddBook'
import EditBook from './src/components/EditBook'

const client = new ApolloClient({
  link: new HttpLink({uri: `http://192.168.56.1:3001/graphql`}),
  cache: new InMemoryCache()
});

export default class App extends Component<{}> {
  render() {
    const Navigasi = StackNavigator({
      ListBook: {screen: ListBook},
      AddBook: {screen: AddBook},
      EditBook: {screen: EditBook}
    })
    return (
      <ApolloProvider client={client}>
        <Navigasi />
      </ApolloProvider>
    )
  }
}
