import React, { Component } from "react";
import { ScrollView } from "react-native";
import Proptypes from "prop-types";

import colors from "../config/style";

import ListItem from "../components/List/ListItem";
import Separator from "../components/List/Separator";

export default class Themes extends Component {
    render() {
        return (
            <ScrollView>
                <ListItem
                    text="Blue"
                    onPress={() => this.handleThemePress(colors.primaryBlue)}
                    selected
                    checkmark={false}
                    iconBackground={colors.primaryBlue}
                />
                <Separator />
                <ListItem
                    text="Orange"
                    onPress={() => this.handleThemePress(colors.primaryOrange)}
                    selected
                    checkmark={false}
                    iconBackground={colors.primaryOrange}
                />
                <Separator />
                <ListItem
                    text="Green"
                    onPress={() => this.handleThemePress(colors.primaryGreen)}
                    selected
                    checkmark={false}
                    iconBackground={colors.primaryGreen}
                />
                <Separator />
                <ListItem
                    text="Purple"
                    onPress={() => this.handleThemePress(colors.primaryPurple)}
                    selected
                    checkmark={false}
                    iconBackground={colors.primaryPurple}
                />
                <Separator />
            </ScrollView>
        );
    }

    handleThemePress(color) {
        console.log("pressed a theme", color);
        this.props.navigation.goBack();
    }
}

Themes.propTypes = {
    navigation: Proptypes.object
}