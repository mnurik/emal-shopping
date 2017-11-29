import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { SERVER_URL } from './../../utils/services'
import PropTypes from 'prop-types'
import { ParallaxImage } from 'react-native-snap-carousel'
import styles from './../../config/SliderEntry.style'

export default class SliderEntry extends Component {
  static propTypes = {
    imgSrc: PropTypes.string.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  }

  get image() {
    const { imgSrc, parallax, parallaxProps, even } = this.props

    return parallax ? (
      <ParallaxImage
        source={{ uri: `${SERVER_URL}img/${imgSrc}` }}
        containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image source={{ uri: `${SERVER_URL}img/${imgSrc}` }} style={styles.image} />
    )
  }

  render() {
    const { even } = this.props

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          alert(`You've clicked '${title}'`)
        }}
      >
        <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
          {this.image}
          <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
        </View>
      </TouchableOpacity>
    )
  }
}
