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
  
  deleteItem() {
    alert("Delete Me!")
    const movieId = this.state.movie.id
    this.props.mutate({ variables: { movieId } })

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
        <Button title="Delete" onPress={() => this.deleteItem()} />
      </View>
    )
  }
}



/* export default graphql(gql`
  mutation{
    deleteMovie(input:{
      id: $id
    })
  }`,
  {
    options: (props) => ({
      variables: {
        id: props.id,
      },
    })
  }
)(DetailScreen); */

const deleteMovieMutation = gql`
  mutation deleteMovie($id: String!) {
    deleteMovie(input:{
      id: $id
    })
  }`

export default graphql(deleteMovieMutation)(DetailScreen)