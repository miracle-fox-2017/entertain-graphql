import React, { Component } from 'react';
import Dimensions from 'react-native'
import { Container, Header, View, Button, Icon, Fab } from 'native-base'
import { Screen, Image, Tile, Divider, ListView, Title, Subtitle } from "@shoutem/ui";


export default class Home extends Component {
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
    const { navigate } = this.props.navigation
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
