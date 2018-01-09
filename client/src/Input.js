//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import { TextInput, Button, Text } from '@shoutem/ui'
import { graphql } from "react-apollo"
import gql from 'graphql-tag'

// create a component
class Input extends Component {
  static navigationOptions = {
    header: null
  }
  constructor() {
    super()
    this.state = {
      title: '',
      overview: '',
      popularity: '',
      poster_path: ''
    }
  }
  saveMovie () {

  }
  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={{padding:10}}></Text>
        <TextInput
          placeholder={'Title'}
          onChangeText={ (text) => this.setState({title: text})}
        />
        <Text style={{padding:10}}></Text>
        <TextInput
          multiline = {true}
          placeholder={'Overview'}
          onChangeText={ (text) => this.setState({overview: text})}
        />
        <Text style={{padding:10}}></Text>
        <TextInput
          placeholder={'Popularity'}
          onChangeText={ (text) => this.setState({popularity: text})}
        />
        <Text style={{padding:10}}></Text>
        <TextInput
          placeholder={'Poster Path'}
          onChangeText={ (text) => this.setState({poster_path: text})}
        />
        <Text style={{padding:30}}></Text>
        <View style={{flexDirection: 'row'}} styleName="horizontal">
          <Button 
            onPress={ () => this.saveMovie()}
            styleName="confirmation">
            <Text>Save</Text>
          </Button>

          <Button 
            onPress={() => goBack()}
            styleName="confirmation dark">
            <Text>Cancel</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const saveData = gql`
  mutation {
    addMovie(movieParam: {title: '', overview: '', poster_path: '', popularity: ''})
  }
`
const allexport = graphql(saveData)(Input)

export default allexport
