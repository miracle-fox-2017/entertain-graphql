import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Home extends Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {marginTop: 24}
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.props.data.getMovies}
          keyExtractor={item => item.id}
          renderItem={({item}) => 
            <View style={{flexGrow: 1, alignItems: 'center', flexDirection: 'row', margin: 10, backgroundColor: '#ffffff'}}>
              <Image style={{marginLeft: 20, width: 50, height: 100}} resizeMode='contain' source={{uri: item.poster_path}}/>
              <Text style={{marginLeft: 10}}>{item.title}</Text>
            </View>}
        />
      </View>
    )
  }
}

const ALL_MOVIES_QUERY = gql`
  query {
    getMovies {
      id
      title
      poster_path
      overview
      popularity
    }
  }
`

export default graphql(ALL_MOVIES_QUERY)(Home)