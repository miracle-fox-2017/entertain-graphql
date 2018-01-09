import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen'
import DetailScreen from './screens/DetailScreen'
import AddMovieScreen from './screens/AddMovieScreen'
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link: new HttpLink({ uri: 'http://10.0.3.2:4000/graphql' }),
  cache: new InMemoryCache()
});

const MainApp = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DetailScreen
  },
  AddMovie: {
    screen: AddMovieScreen
  },
})

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MainApp />
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
