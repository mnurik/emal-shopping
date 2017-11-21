import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

export default class Separator extends Component {
    render() {
        return <View style={style.separator} />
    }
}

const style = StyleSheet.create({
  separator: {
    marginLeft: 20,
    backgroundColor: colors.border,
    flex: 1,
    height: StyleSheet.hairlineWidth
  }
});