import React, { Component } from "react";
import { 
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    Keyboard,
    Animated
} from "react-native";

export default class Logo extends Component {
    keyboardShow() {
        Animated.parallel([
            Animated.timing(this.containerImageWidth, {
                toValue: styleVariables.containerSize.small,
                duration: styleVariables.animation_duration
            }),
            Animated.timing(this.imageWidth, {
                toValue: styleVariables.imageSize.small,
                duration: styleVariables.animation_duration
            }),
        ]).start();
    }

    keyboardHide() {
        Animated.parallel([
            Animated.timing(this.containerImageWidth, {
                toValue: styleVariables.containerSize.large,
                duration: styleVariables.animation_duration
            }),
            Animated.timing(this.imageWidth, {
                toValue: styleVariables.imageSize.large,
                duration: styleVariables.animation_duration
            })
        ]).start();
    }

    constructor(props) {
        super(props);
        this.containerImageWidth = new Animated.Value(styleVariables.containerSize.large);
        this.imageWidth = new Animated.Value(styleVariables.imageSize.large);
    }

    componentWillMount() {
        this.keyboardShowListener = Keyboard.addListener("keyboardDidShow", this.keyboardShow.bind(this));
        this.keyboardHideListener = Keyboard.addListener("keyboardDidHide", this.keyboardHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardShowListener.remove();
        this.keyboardHideListener.remove();
    }

    getContainerImageStyle() {
        return StyleSheet.flatten([
            style.containerImage,
            { width: this.containerImageWidth, height: this.containerImageWidth },
        ]);
    }

    getLogoStyle() {
        return StyleSheet.flatten([
            style.logo,
            { width: this.imageWidth }
        ]);
    }

    render() {
        return (
            <View style={style.container}>
                <Animated.Image 
                    source={require("./images/background.png")} 
                    style={this.getContainerImageStyle()} 
                    resizeMode="contain"
                >
                    <Animated.Image 
                        source={require("./images/logo.png")} 
                        style={this.getLogoStyle()}
                        resizeMode="contain"
                    />
                </Animated.Image>
                <Text style={style.text}>Currency Converter</Text>
            </View>
        );
    }
}

const screenWidth = Dimensions.get("window").width;
const styleVariables = {
    animation_duration: 250,
    imageSize: {
        large: screenWidth / 4,
        small: screenWidth / 8
    },
    containerSize: {
        large: screenWidth / 2,
        small: screenWidth / 4
    }
}

const style = StyleSheet.create({
    container: {
        alignItems: "center",
        marginBottom: 20,
    },

    containerImage: {
        alignItems: "center",
        justifyContent: "center",
        width: styleVariables.containerSize.large,
        height: styleVariables.containerSize.large,
    },

    logo: {
        width: styleVariables.imageSize.large,
    },

    text: {
        fontWeight: "600",
        fontSize: 28,
        letterSpacing: -0.5,
        marginTop: 10,
        color: "white",
    }
  });