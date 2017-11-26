import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import Proptypes from 'prop-types';

export default class ClearButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={style.container}>
        <View style={style.wrapper}>
          <Text style={style.text}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

ClearButton.propTypes = {
  text: Proptypes.string,
  onPress: Proptypes.func
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center'
  },

  wrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  icon: {
    width: 19,
    marginRight: 10
  },

  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
    padding: 20
  }
});
