import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Home extends Component {
  static navigationOptions = {
    headerTitle: 'User list',
    headerStyle: { marginTop: 24 },
  }

  constructor() {
    super()
    this.state = {}
  }

  render(){
    console.log(this.props.data)
    return(
      <View style={styles.container}>
        <FlatList
          data={this.props.data.user}
          keyExtractor = {(item, index) => index}
          renderItem={({item}) => {
            return (
              <View style = {{
                              marginBottom: 5,
                              flexDirection: 'row'
                            }}
              >
                <Text style={{ paddingLeft: 2 }}>{item.name}</Text>
                <Text style={{ paddingLeft: 2 }}>{item.address}</Text>
                <Text style={{ paddingLeft: 2 }}>{item.age}</Text>
              </View>
            )}
          }
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5
  },
});

// export default Home
export default graphql(gql`
  query{
    user {
      _id
      name
      address
      age
      createdAt
    }
  }
`)(Home);
