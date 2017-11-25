import React, { Component } from 'react';
import { ScrollView, Image, Text, FlatList, View, StyleSheet } from 'react-native';
import Proptypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getProduct, getAddress, SERVER_URL } from './../utils/services';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingTop: 30
  }
});

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
        <View style={styles.container}>
          <Image
            source={{ uri: `${SERVER_URL}img/${product.ImageURL}` }}
            style={{ alignSelf: 'stretch', height: 140 }}
          />
          <FlatList data={this.state.addresses} renderItem={({ item }) => <Text>{item.Address}</Text>} />
        </View>
      </ScrollView>
    );
  }
}

export default Product;
