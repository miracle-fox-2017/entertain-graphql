import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Home from './src/Home'
import Edit from './src/Edit'
import Input from './src/Input'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3000/graphql'}),
  cache: new InMemoryCache()
})

const Nav = StackNavigator({
  Home: { screen: Home },
  Input: { screen: Input },
  Edit: { screen: Edit }
})
export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Nav/>
      </ApolloProvider>
    )
  }
}

