import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class MovieRow extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const styles = StyleSheet.create({
      movieItem: {
        backgroundColor: '#fff',
        padding: 10,
        width: 400,
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

    const movie = this.props.movie;

    return (
      <View style={styles.movieItem}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.title}>{movie.overview}</Text>
      </View>
    )
  }
}