import React, { Component } from "react";
import {
    View,
    Image,
    StyleSheet
} from "react-native";
import Proptypes from "prop-types";

import colors from "./../../config/style";

export default class Icon extends Component {
    render() {
        let iconStyle = [style.icon];
        if (this.props.visible) {
            iconStyle = StyleSheet.flatten([iconStyle, style.iconVisible]);
        }
        if (this.props.iconBackground) {
            iconStyle = StyleSheet.flatten([iconStyle, { backgroundColor: this.props.iconBackground }]);
        }
        return (
            <View style={iconStyle}>
                {this.props.checkmark ?
                    <Image
                        source={require("./images/check.png")}
                        style={style.checkIcon}
                        resizeMode="contain" />
                    :
                    null
                }
            </View>
        );
  }
}

Icon.propTypes = {
    checkmark: Proptypes.bool,
    visible: Proptypes.bool,
    iconBackground: Proptypes.string
}

const style = StyleSheet.create({
    icon: {
        backgroundColor: "transparent",
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    },

    iconVisible: {
        backgroundColor: colors.primaryBlue
    },

    checkIcon: {
        width: 18
    }
});