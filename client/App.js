import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
// import { Provider } from 'react-redux'
// import store from './store/store'
import {
  Text,
  View
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import HomeScreen from './screen/Home'
import AddUserScreen from './screen/AddUser'
import DeleteUserScreen from './screen/DeleteUser'
const query = gql`
query{
  user {
    _id
    name
    address
    age
    createdAt
  }
}
`;

const Apps = StackNavigator({
  Home: { screen: HomeScreen },
  AddUser: { screen: AddUserScreen },
  DeleteUser: { screen: DeleteUserScreen }
});

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://192.168.0.166:4000/graphql' }),
  cache: new InMemoryCache()
});

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      users: []
    }
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Apps />
      </ApolloProvider>
    );
  }
}
