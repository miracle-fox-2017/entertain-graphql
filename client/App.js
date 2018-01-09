import React, { Component } from 'react';
import { Container } from 'native-base';
import Movielist from './components/MovieList'
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {
  ApolloProvider
} from 'react-apollo'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://192.168.57.1:4000/graphql' }),
  cache: new InMemoryCache()
})

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Movielist/>
      </ApolloProvider>
    );
  }
}
