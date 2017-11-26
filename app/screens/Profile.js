import React, { Component } from 'react';
import { ScrollView, Image, Text, FlatList, View, StyleSheet, Button, Alert } from 'react-native';
import Proptypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SERVER_URL } from './../utils/services';
import * as storage from './../utils/storage';
import ListItem from '../components/List/ListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingTop: 30
  }
});

export default class Profile extends Component {
  state = { user: {} };

  componentDidMount() {
    storage.getItem('user').then(user => this.setState({ user }));
  }

  render() {
    const { user } = this.state;
    return (
      <View style={styles.container}>
        <Text>{user.Name}</Text>
        <ListItem text={user.BirthDay} />
        <ListItem text={user.Phone} />
        <ListItem text={user.Address} />
        <ListItem text={user.UserName} />
        <ListItem text={user.Password} />
      </View>
    );
  }
}
