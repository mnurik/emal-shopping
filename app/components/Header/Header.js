import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Proptypes from 'prop-types';

export default class Header extends Component {
  render() {
    return (
      <View style={style.navbar}>
        <TouchableOpacity style={style.button} onPress={this.props.onPress}>
          <Text>Xer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Header.propTypes = {
  onPress: Proptypes.func
};

const style = StyleSheet.create({
  navbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0
  },

  button: {
    alignSelf: 'flex-end',
    paddingVertical: 5,
    paddingHorizontal: 20
  },

  icon: {
    width: 18
  }
});
