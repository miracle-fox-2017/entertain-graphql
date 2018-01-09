import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Button, 
  FlatList, 
  ActivityIndicator, 
  TextInput 
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { StackNavigator } from 'react-navigation';
import MovieRow from '../components/MovieRow'


class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movieList: [
        {
          title: 'Titanic',
          overview: 'Ice SHip'
        },
        {
          title: 'Predator',
          overview: 'Jungle SHip'
        }
      ],
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      movieList: nextProps.data.movie
    })
  }

  render() {
    const { navigate } = this.props.navigation
    const styles = StyleSheet.create({
      title: {
        fontSize: 20,
        fontWeight: 'bold'
      },

      container: {
        flex: 1,
        minHeight: 100,
        justifyContent: 'center',
        alignItems: 'center'
      },
    }); 

    console.log(`===========RENDER HOME!!`)
   
    return (
      <View style={styles.container}>
        <Button title="New Movie" onPress={() => navigate('AddMovie', { type: 'newMovie' })}/>
        <FlatList
          data={this.state.movieList}
          keyExtractor={(item, index) => 'movie-'+index}
          renderItem={({item}) => {
            return(
              <TouchableOpacity onPress={() => navigate('Details', { movie: item })}>
                <MovieRow movie={item}/>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    )
  }
}

export default graphql(gql`
  query{
    movie {
      _id
      title
      overview
    }
  }
`)(HomeScreen);