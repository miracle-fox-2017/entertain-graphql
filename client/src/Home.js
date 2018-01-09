import React, { Component } from 'react'
import { Container, Header, View, Button, Icon, Fab, Spinner } from 'native-base'
import { NavigationBar, Screen, Image, Tile, Divider, ListView, Title, Subtitle } from '@shoutem/ui'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


class Home extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      active: 'true',
      restaurants: [{
        'name': 'Gaspar Brasserie',
        'address': '185 Sutter St, San Francisco, CA 94109',
        'image': { 'url': 'https://shoutem.github.io/static/getting-started/restaurant-1.jpg' },
      }, {
        'name': 'Chalk Point Kitchen',
        'address': '527 Broome St, New York, NY 10013',
        'image': { 'url': 'https://shoutem.github.io/static/getting-started/restaurant-2.jpg' },
      }],
    }
  }
  renderRow(movie) {
    return (
      <View>
        <Image
          styleName='large-banner'
          source={{ uri: movie.poster_path }}
        >
          <Tile>
            <Title styleName='md-gutter-bottom'>{movie.title}</Title>
            <Subtitle styleName='sm-gutter-horizontal'>{movie.popularity}</Subtitle>
          </Tile>
        </Image>
        <Divider styleName='line' />
      </View>
    );
  }
  render() {
    const { data: { movies, error }, navigation : { navigate } } = this.props
    let showMovies = null
    if(!movies){
      showMovies = <View style={{ flex: 1,  justifyContent: 'center', alignItems: 'center'}}><Bubbles color='blue'/></View>
    } else {
      showMovies = <ListView
        data={movies}
        renderRow={this.renderRow}
      />
    }

    return (
      <View style={{ flex: 1 }}>
        <Screen>
          {error && error.message}
          { showMovies }
        </Screen>
        <Fab
          active={this.state.active}
          direction='up'
          containerStyle={{ }}
          style={{ backgroundColor: '#5067FF' }}
          position='bottomRight'
          onPress={() => navigate('Input')}>
          <Icon name='add' />
        </Fab>
      </View>
    )
  }
}

const getAllData = gql`
  query {
    movies {
      _id
      title
      overview
      poster_path
      popularity
    }
  }
`
const allexport = graphql(getAllData)(Home)

export default allexport