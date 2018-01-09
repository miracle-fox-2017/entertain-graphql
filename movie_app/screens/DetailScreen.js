import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class DetailScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movie: {
        id: '',
        title: '',
        overview: ''
      }
    }
  }
  
  deleteItem = async (movieId) => {
    alert(`DELETE Movie ${movieId}`)

    await this.props.mutate({ variables: { id: movieId } })
    
    const { navigate } = this.props.navigation;
    // navigate('Home')
    this.props.navigation.dispatch(NavigationActions.back())
  }

  componentDidMount() {
    const { navigate, state } = this.props.navigation
    const movie = state.params.movie;

    this.setState({
      movie : movie
    })
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
        <Text style={styles.title}>{this.state.movie.title}</Text>
        <Text>{this.state.movie.overview}</Text>
        <Button title="Delete" onPress={() => this.deleteItem(movie._id)} />
      </View>
    )
  }
}

const deleteMovie = gql`
  mutation deleteMovie($id: String){
    deleteMovie(input:{
      id: $id
    })
    {
      _id
      title
      overview
    }
  }`

export default graphql(deleteMovie)(DetailScreen)