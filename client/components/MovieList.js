import React from 'react';
import { ScrollView } from 'react-native';
import { Container,Header, Content, Form, Item, Input, Label, Button, Text, Icon, List, ListItem, Body, Thumbnail } from 'native-base';
import { graphql } from 'react-apollo';
import gpl from 'graphql-tag'

class MovieList extends React.Component {
  constuctor () {

    this.state = {
      title: '',
      overview: '',
      poster_path: '',
      popularity: '',
      status: '',
      tag: ''
    }
  }


  render() {
    const { movies } = this.props.data
    return (
      <ScrollView>
        <Container>
        <Header />
          <Content>
          <Item>
            <Icon active name='paper' />
            <Input placeholder='INPUT FORM MOVIE'/>
          </Item>
          <Form>
          <Item floatingLabel>
          <Label>Title</Label>
          <Input />
          </Item>
          <Item floatingLabel last>
          <Label>Overview</Label>
          <Input />
          </Item>
          <Item floatingLabel last>
          <Label>Poster_Path</Label>
          <Input />
          </Item>
          <Item floatingLabel last>
          <Label>Popularity</Label>
          <Input />
          </Item>
          <Item floatingLabel last>
          <Label>Status</Label>
          <Input />
          </Item>
          <Item floatingLabel last>
          <Label>Tag</Label>
          <Input />
          </Item>
          <Button block success>
          <Text>Success</Text>
          </Button>
          </Form>
          </Content>
        </Container>

        <Item>
          <Icon active name='film' />
          <Input placeholder='LIST FILM'/>
        </Item>

        <Container>
          <Content>
            <List>
              <ListItem>
                {movies && movies.map((data,index) => {
                  return (
                    <Container>
                    <Thumbnail square size={80} source={{ uri: data.poster_path}} />
                    <Body>
                      <Text>{data.title}</Text>
                      <Text note>{data.overview}</Text>
                    </Body>
                    </Container>
                  )
                })}
              </ListItem>
            </List>
          </Content>
        </Container>
      </ScrollView>
    )
  }

}

export default graphql(gpl
  `query {
    movies {
      title,
      overview,
      poster_path,
      popularity,
      status,
      tag
    }
  }`)(MovieList)
