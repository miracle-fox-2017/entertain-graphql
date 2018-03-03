import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, TextInput } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class AddMovieScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      title: '',
      overview: ''
    }
  }

  addNewMovie = async () => {
    await this.props.mutate({ variables: { title: this.state.title, overview: this.state.overview} })
    const { navigate } = this.props.navigation;
    this.props.navigation.dispatch(NavigationActions.back())
  }

  deleteItem = async (movieId) => {
    alert(`DELETE Movie ${movieId}`)

    await this.props.mutate({ variables: { id: movieId } })

    const { navigate } = this.props.navigation;
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render() {
    const { navigate, state } = this.props.navigation
    const movie = state.params.movie;

    const styles = StyleSheet.create({
      movieItem: {
        backgroundColor: '#fff',
        padding: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10
      },

      title: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: 'bold'
      }
    });

    return (
      <View style={styles.movieItem}>
        <Text style={styles.title}>New Movie</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder="Movie Title"
          onChangeText={(title) => this.setState({ 
            title: title
           })}
          value={this.state.title}
        />

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder="Movie Overview"
          onChangeText={(overview) => this.setState({
            overview: overview
          })}
          value={this.state.overview}
        />

        <Button title="New Movie" onPress={() => this.addNewMovie()}/>
      </View>
    )
  }
}

const addMovie = gql`
  mutation addMovie($title: String, $overview: String){
    addMovie(input:{
      title: $title,
      overview: $overview
    }) {
      _id
      title
      overview
    }
  }`

export default graphql(addMovie)(AddMovieScreen)