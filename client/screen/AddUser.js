import React, { Component } from 'react'
import {
  Text
} from 'react-native'

class AddUser extends Component {
  static navigationOptions = {
    headerTitle: 'Add User',
    headerStyle: { marginTop: 24 },
  }

  constructor(){
    super()
    this.state = {}
  }

  render(){
    return (
      <Text>This is Add User</Text>
    )
  }
}

export default AddUser
