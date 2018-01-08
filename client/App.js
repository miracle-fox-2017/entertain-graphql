import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProfileList from './components/ProfileList'
import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider
} from 'react-apollo'

const client = new ApolloClient()

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ProfileList />
      </View>
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
