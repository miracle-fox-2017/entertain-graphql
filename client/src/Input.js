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
  saveMovie = () => {
    let { title, overview, popularity, poster_path } = this.state
    let obj = {
      title: title,
      overview: overview,
      popularity: popularity,
      poster_path: poster_path
    }
    console.log('====================================')
    console.log(this.props)
    console.log('====================================')
    this.props.mutate({variables: obj })
    .then( () => {
      this.props.navigation.navigate('Home')
    })
    .catch(err => {
      console.log('====================================')
      console.log(err)
      console.log('====================================')
    })
    
  }
  render() {
    const { navigation: { goBack } } = this.props;
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

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00BEF7',
    paddingTop: 30,
    padding: 15
  },
});

//make this component available to the app
const saveData = gql`
  mutation addMovie($title: String, $overview: String, $poster_path: String, $popularity: String){
    addMovie(movieParam: {title: $title , overview: $overview, poster_path: $poster_path, popularity: $popularity})
  }
`
export default graphql(saveData)(Input)
