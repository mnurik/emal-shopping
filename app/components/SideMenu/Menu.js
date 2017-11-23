import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-native';
import { Dimensions, StyleSheet, ScrollView, View, Text } from 'react-native';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 10,
    paddingTop: 30
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5
  }
});

const Menu = ({ onItemSelected }) => {
  return (
    <View style={styles.menu}>
      <Link to="/login" onPress={onItemSelected}>
        <Text style={styles.item}>Login</Text>
      </Link>
      <Link to="/grouplist/0" onPress={onItemSelected}>
        <Text style={styles.item}>Products</Text>
      </Link>
    </View>
  );
};

export default Menu;
