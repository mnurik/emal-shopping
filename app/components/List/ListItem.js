import React, { Component } from 'react'
import { View, Text, TouchableHighlight, StyleSheet, Image } from 'react-native'
import Proptypes from 'prop-types'

import Icon from './Icon'

import colors from '../../config/style'

export default class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor={colors.border}>
        <View style={style.row}>
          {this.props.imgSrc && <Image style={{ width: 50, height: 50 }} source={{ uri: this.props.imgSrc }} />}
          <Text style={style.text}>{this.props.text}</Text>
          {this.props.selected ? (
            <Icon
              checkmark={this.props.checkmark}
              visible={this.props.visible}
              iconBackground={this.props.iconBackground}
            />
          ) : (
            <Icon />
          )}
          {this.props.customIcon}
        </View>
      </TouchableHighlight>
    )
  }
}

ListItem.propTypes = {
  onPress: Proptypes.func,
  text: Proptypes.string,
  customIcon: Proptypes.element,
  iconBackground: Proptypes.string,
  selected: Proptypes.bool,
  checkmark: Proptypes.bool,
  visible: Proptypes.bool
}

ListItem.defaultProps = {
  customIcon: null,
  selected: false,
  checkmark: true,
  visible: true
}

const style = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  text: {
    fontSize: 16,
    color: colors.darkText
  }
})
