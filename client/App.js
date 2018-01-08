import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'
import Home from './src/Home'
import Edit from './src/Edit'
import Input from './src/Input'

const Nav = StackNavigator({
  Home: { screen: Home },
  Input: { screen: Input },
  Edit: { screen: Edit }
})
export default class App extends Component {
  render() {
    return (
      <Nav/>
    )
  }
}

