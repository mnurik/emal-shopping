import React, { Component } from 'react';
import { ScrollView, Image, Text } from 'react-native';
import { MapView } from 'expo';
import Proptypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getProduct, getAddress, SERVER_URL } from './../utils/services';

class Product extends Component {
  state = {
    product: {},
    addresses: []
  };

  componentDidMount() {
    const { productId } = this.props.match.params;
    getProduct(productId).then(product =>
      this.setState({ product }, () => {
        getAddress(productId, this.state.product['FK_SP_Supplier']).then(addresses => this.setState({ addresses }));
      })
    );
  }

  render() {
    const { product } = this.state;
    return (
      <ScrollView>
        <Image
          source={{ uri: `${SERVER_URL}img/${product.ImageURL}` }}
          style={{ alignSelf: 'stretch', height: 140, width: 200 }}
        />
        {this.state.addresses.map(address => <Text>{address.Address}</Text>)}
        <MapView style={{ alignSelf: 'stretch', height: 200 }} />
      </ScrollView>
    );
  }
}

export default Product;
