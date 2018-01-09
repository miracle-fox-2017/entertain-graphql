import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { graphql } from 'react-apollo';
import gpl from 'graphql-tag'

class ProfileList extends React.Component {
  constructor() {
    super()

    this.state = {
      firstName: '',
      lastName: '',
      address: ''
    }
  }

  addData = async () => {
    try {
      const { firstName, lastName, address } = this.state
      await this.props.addProfile({
        variables: {
          firstName,
          lastName,
          address
        }
      })
    } catch (error) {
      console.log(error)
    }

  }

  editData() {

  }

  deleteData() {

  }
  render() {
    const { profiles } = this.props.data
    return (
      <ScrollView>
        <View style={styles.textInput}>
          <TextInput placeholder="First Name" onChangeText={(text) => this.setState({ firstName: text })} />
          <TextInput placeholder="Last Name" onChangeText={(text) => this.setState({ lastName: text })} />
          <TextInput placeholder="Address" onChangeText={(text) => this.setState({ address: text })} />
          <Button title="Add Data" onPress={() => this.addData()} />

        </View>

        <Text style={styles.title}>Profile List</Text>
        {profiles && profiles.map((profile, index) => {
          return (
            <View key={index} style={styles.data}>
              <Text>{profile.firstName}</Text>
              <Text>{profile.lastName}</Text>
              <Text>{profile.address}</Text>
              <View style={styles.btn}>
                <Button title="Edit" onPress={() => this.editData(profile._id)} />
                <Button title="Delete" onPress={() => this.deleteData(profile._id)} />
              </View>
            </View>
          )
        })}

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20
  },
  data: {
    borderBottomWidth: 1
  },
  textInput: {
    width: 300
  },
  btn: {
    width: 150,
    flex: 1,
    flexDirection: 'row'
  }
});

export default graphql(gpl`
query{
  profiles {
    firstName,
    lastName,
    address,
    _id
  }
}`)
  (graphql(gpl`
mutation addProfile($firstName: String, $lastName: String, $address: String){
  addProfile(
    firstName: $firstName,
    lastName: $lastName,
    address: $address)
    {
    firstName
    lastName
    address
    _id
  }
}
  `, { name: 'addProfile' })(ProfileList))