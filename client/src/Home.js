import React, { Component } from 'react'
import { Container, Header, View, Button, Icon, Fab } from 'native-base'
import { Screen, Image, Tile, Divider, ListView, Title, Subtitle } from "@shoutem/ui"
import { graphql } from "react-apollo"
import gql from 'graphql-tag'


class Home extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      active: 'true',
      restaurants: [{
        "name": "Gaspar Brasserie",
        "address": "185 Sutter St, San Francisco, CA 94109",
        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
      }, {
        "name": "Chalk Point Kitchen",
        "address": "527 Broome St, New York, NY 10013",
        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg" },
      }],
    }
  }
  renderRow(restaurant) {
    return (
      <View>
        <Image
          styleName="large-banner"
          source={{ uri: restaurant.image.url }}
        >
          <Tile>
            <Title styleName="md-gutter-bottom">{restaurant.name}</Title>
            <Subtitle styleName="sm-gutter-horizontal">{restaurant.address}</Subtitle>
          </Tile>
        </Image>
        <Divider styleName="line" />
      </View>
    );
  }
  render() {
    const { data } = this.props
    const { navigate } = this.props.navigation
    console.log('====================================')
    console.log(this.props, 'MOVIES')
    console.log('====================================')
    return (
      <View style={{ flex: 1 }}>
      <Screen>
        <ListView
          data={this.state.restaurants}
          renderRow={this.renderRow}
        />
      </Screen>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{ }}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}>
          <Icon name="add" />
        </Fab>
      </View>
    )
  }
}

const getAllData = gql`
  query getAllData {
    movies {
      _id
      title
      overview
      poster_path
      popularity
    }
  }
`
const allexport = graphql(getAllData, {
  // ownProps are the props that are passed into the `ProfileWithData`
  // when it is used by a parent component
  props: ({data: { loading, movies, refetch } }) => ({
    loading: loading,
    movies: movies,
    refetchUser: refetch,
  }),
})(Home)

export default allexport