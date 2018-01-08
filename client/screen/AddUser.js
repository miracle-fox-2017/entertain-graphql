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

class AddUser extends Component {
  static navigationOptions = {
    headerTitle: 'Add User',
    headerStyle: { marginTop: 24 }
  }

  constructor(){
    super()
    this.state = {
      name: '',
      address: '',
      age: ''
    }
    this.addUserHandler = this.addUserHandler.bind(this)
    this.resetHandler = this.resetHandler.bind(this)
  }

  addUserHandler = async () => {
    try {
      const {name, address, age} = this.state
      await this.props.mutate({variables: {name, address, age}})
    } catch (err) {
      console.log(err)
    }
  }

  resetHandler() {
    this.setState({
      name: '',
      address: '',
      age: ''
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={{
          marginLeft: 5,
          marginRight: 5,
        }}>
          <Text style={{
            marginTop: 10
          }}>Name:</Text>
          <TextInput
            style={{
              height: 40,
              paddingLeft: 5,
              paddingRight: 5,
              marginBottom: 10,
              borderColor: 'gray',
              borderWidth: 1
            }}
            onChangeText={(text) => this.setState({name: text})}
            value={this.state.name}
          />
          <Text>Address:</Text>
          <TextInput
            style={{
              height: 40,
              paddingLeft: 5,
              paddingRight: 5,
              marginBottom: 10,
              borderColor: 'gray',
              borderWidth: 1
            }}
            onChangeText={(text) => this.setState({address: text})}
            value={this.state.address}
          />
          <Text>Age:</Text>
          <TextInput
            style={{
              height: 40,
              paddingLeft: 5,
              paddingRight: 5,
              marginBottom: 10,
              borderColor: 'gray',
              borderWidth: 1
            }}
            keyboardType='numeric'
            onChangeText={(text) => this.setState({age: text})}
            value={this.state.age}
          />
          <View style = {{ marginBottom: 5 }}>
            <Button
            title = 'Add New User'
            onPress= { () => this.addUserHandler() } />
          </View>
          <View style = {{ marginBottom: 5 }}>
            <Button
            title = 'Reset'
            onPress= { () => this.resetHandler() } />
          </View>
        </View>
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
  mutation createUser($name: String!, $address: String!, $age: Int) {
    createUser(input: {name: $name, address: $address, age: $age})
    {
      msg
      err
      data
    }
  }
`)(AddUser);
