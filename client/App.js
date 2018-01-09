import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProfileList from './components/ProfileList';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {
  ApolloProvider
} from 'react-apollo'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://192.168.1.101:3000/graphql' }),
  cache: new InMemoryCache()
})

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <ProfileList />
        </View>
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
    paddingTop: 50,
    paddingBottom: 50
  },
});
