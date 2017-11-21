import React, { Component } from "react";
import { ScrollView, Linking } from "react-native";
import Proptypes from "prop-types";
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from "../config/style";
import ListItem from "../components/List/ListItem";
import Separator from "../components/List/Separator";;

class Options extends Component {
    render() {
        return (
            <ScrollView>
                <ListItem
                    text="Themes"
                    onPress={this.handleThemesPress}
                    customIcon={
                        <Icon name="arrow-right" size={styleVariables.iconSize} color={colors.primaryBlue} />
                    }
                />
                <Separator />
                <ListItem
                    text="Fixer.io"
                    onPress={this.handleSitePress}
                    customIcon={
                        <Icon name="link" size={styleVariables.iconSize} color={colors.primaryBlue} />
                    }
                />
                <Separator />
            </ScrollView>
        );
    }

    handleThemesPress = () => {
        console.log("pressed themes");
        this.props.navigation.navigate("Themes");
    }

    handleSitePress = () => {
        console.log("pressed site");
        Linking.openURL("httep://fixer.io").catch(() => alert("Could not open Fixer.io"));
    }
}

export default Options;

Options.propTypes = {
    navigation: Proptypes.object,
}

const styleVariables = {
    iconSize: 24
}