import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { AppRegistry } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'

const allMovie = gql`
  query {
    movie {
	    _id
	    poster_path
	    overview
	    title
	    popularity
	    tag
	    version
    }
  }`

class ListMovie extends Component {
  	constructor(props) {
  		super()
  		this.state = {
  			Movies: []
  		}
  	}

 	componentWillMount() {
 		alert(JSOthis.props)
 	}
	componentWillReceiveProps(nextProps) {
		alert(JSON.stringify(nextProps))
	  this.setState({
	    Movies: nextProps.data
	  })
	}

  	render() {
    return (
		<Container>
	        <Header>
	        <Text> {JSON.stringify(this.state.Movies)} </Text>
	        </Header>
	        <Content>
	          <Card style={{flex: 0}}>
	            <CardItem>
	              <Left>
	                <Thumbnail source={{uri: 'http://www.nbcolympics.com/sites/default/files/field_image/12March2016/1024x576_swimming.jpg'}} />
	                <Body>
	                  <Text>NativeBase {JSON.stringify(this.state.Movies)} </Text>
	                  <Text note>April 15, 2016</Text>
	                </Body>
	              </Left>
	            </CardItem>
	            <CardItem>
	              <Body>
	                <Image source={{uri: 'http://www.nbcolympics.com/sites/default/files/field_image/12March2016/1024x576_swimming.jpg'}} style={{height: 200, width: 200, flex: 1}}/>
	                <Text>
	                  //Your text here
	                </Text>
	              </Body>
	            </CardItem>
	            <CardItem>
	              <Left>
	                <Button transparent textStyle={{color: '#87838B'}}>
	                  <Icon name="logo-github" />
	                  <Text>1,926 stars</Text>
	                </Button>
	              </Left>
	            </CardItem>
	          </Card>
	        </Content>
      	</Container>
    );
  }	
}

export default graphql(allMovie, {name: 'allMovie'})(ListMovie)