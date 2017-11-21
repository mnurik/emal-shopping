import React, { Component } from 'react'
import { ScrollView, Image } from 'react-native'
import { MapView } from 'expo'
import Proptypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getProduct, SERVER_URL } from './../utils/services'

class Product extends Component {
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    product: {}
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion })
  }

  componentDidMount() {
    getProduct(this.props.navigation.state.params.productId).then(product => this.setState({ product }))
  }

  render() {
    const { product } = this.state
    return (
      <ScrollView>
        <Image
          source={{
            uri: `${SERVER_URL}img/${product.ImageURL}`
          }}
          style={{ height: 140, width: 200 }}
        />
        <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}
        />
      </ScrollView>
    )
  }
}

export default Product

Product.propTypes = {
  navigation: Proptypes.object
}
