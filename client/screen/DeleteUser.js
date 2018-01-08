import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button
} from 'react-native'

class DeleteUser extends Component {
  static navigationOptions = {
    headerTitle: 'Delete User',
    headerStyle: { marginTop: 24 }
  }

  constructor(){
    super()
    this.state = {}
  }

  deleteHandler = async (_id) => {
    try {
      await this.props.mutate({variables: {_id}})
      alert('success delete')
    } catch (err) {
      console.log(err)
      alert('cannot delete user')
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>This is delete User</Text>
        <Button
          title = 'Confirm Deletion'
          onPress= { () => this.deleteHandler(this.props.navigation.state.params.id)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5
  },
});

// export default AddUser
export default graphql(gql`
  mutation deleteUser($_id: String!) {
    deleteUser(input: {_id: $_id})
    {
      msg
      err
    }
  }
`)(DeleteUser);
