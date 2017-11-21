import React, { Component } from "react";
import Proptypes from "prop-types";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

import style from './style';

export default class Container extends Component {
  render() {
    return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={style.container}>
          {this.props.children}
        </View>
    </TouchableWithoutFeedback>
    );
  }
}

Container.propTypes = {
  children: Proptypes.any
};