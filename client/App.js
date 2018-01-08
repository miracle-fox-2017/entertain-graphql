import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag'

import HomeScreen from './screens/Home'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://192.168.42.210:4000/graphql' }),
  cache: new InMemoryCache()
});

const AppNavigator = StackNavigator({
  home: {
    screen: HomeScreen
  }
})

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppNavigator/>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
