import React, { Component } from 'react';
import { ScrollView, Image, Text, FlatList, View, StyleSheet, Button, Alert } from 'react-native';
import Proptypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getGeneratedCodes } from './../utils/services';
import * as storage from './../utils/storage';
import ListItem from '../components/List/ListItem';

export default class Discounts extends Component {
  state = { codes: [] };

  componentDidMount() {
    storage.getItem('user').then(user => getGeneratedCodes(user.Id).then(codes => this.setState({ codes })));
  }

  render() {
    return (
      <FlatList
        data={this.state.codes}
        renderItem={({ item }) => (
          <ListItem text={item.SupplierName}>
            <Text>{item.Code}</Text>
            <Text>{item.SupplierProductName}</Text>
          </ListItem>
        )}
        keyExtractor={item => item.Code}
      />
    );
  }
}
