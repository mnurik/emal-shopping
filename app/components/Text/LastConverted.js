import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import moment from "moment";
import Proptypes from "prop-types";
import color from "color";

export default class LastConverted extends Component {
    render() {
        return (
            <Text style={style.text}>
                1 {this.props.fromCurrency} = {this.props.conversionRate} {this.props.toCurrency} as of {moment(this.props.date).format("MMMM D, YYYY")}
            </Text>
        );
    }
}

LastConverted.propTypes = {
    date: Proptypes.object,
    fromCurrency: Proptypes.string,
    toCurrency: Proptypes.string,
    conversionRate: Proptypes.number
};

const style = StyleSheet.create({
    text: {
        color: color("white").fade(0.7),
        fontSize: 12,
        textAlign: "center"
    }
});