import React, { Component } from 'react';
import { ScrollView, Image, Text, FlatList, View, StyleSheet, Button, Alert } from 'react-native';
import Proptypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getProduct, getAddress, generateCode, getImages, SERVER_URL } from './../utils/services';
import openMap from 'react-native-open-maps';
import * as storage from './../utils/storage';

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
    addresses: [],
    images: []
  };

  componentDidMount() {
    const { productId } = this.props.match.params;
    getProduct(productId).then(product =>
      this.setState({ product }, () => {
        getAddress(productId, this.state.product['FK_SP_Supplier']).then(addresses => this.setState({ addresses }));
        getImages(productId).then(images => this.setState({ images }));
      })
    );
  }

  handleGenerateCode = () => {
    storage.getItem('user').then(user => {
      generateCode(this.props.match.params.productId, user.Id).then(res => {
        Alert.alert('Discount Title', 'You get discount successfully', [{ text: 'OK' }], { cancelable: false });
      });
    });
  };

  render() {
    const { product, images, addresses } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          {images.map(image => (
            <Image source={{ uri: `${SERVER_URL}img/${image}` }} style={{ alignSelf: 'stretch', height: 140 }} />
          ))}
          <Button onPress={this.handleGenerateCode} title="Get Discount" />
          <FlatList
            data={addresses}
            renderItem={({ item }) => (
              <View>
                <Text>{item.Address}</Text>
                <Button onPress={() => openMap({ latitude: item.Lat, longitude: item.Long })} title="Go" />
              </View>
            )}
            keyExtractor={item => item.FK_SP_SupplierProduct}
          />
        </View>
      </ScrollView>
    );
  }
}

export default Product;
