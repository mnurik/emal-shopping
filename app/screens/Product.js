import React, { Component } from 'react';
import { ScrollView, Image, Text, FlatList, View, StyleSheet, Button, Alert, StatusBar } from 'react-native';
import Proptypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getProduct, getAddress, generateCode, getImages } from './../utils/services';
import openMap from 'react-native-open-maps';
import * as storage from './../utils/storage';
import styles, { colors } from './../config/index.style';
import Carousel from './../components/Carousel/Carousel';

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
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'rgba(0, 0, 0, 0.3)'} barStyle={'light-content'} />
        <ScrollView
          style={styles.scrollview}
          contentContainerStyle={styles.scrollviewContentContainer}
          indicatorStyle={'white'}
          scrollEventThrottle={200}
          directionalLockEnabled={true}
        >
          <Carousel entries={images} />
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
        </ScrollView>
      </View>
    );
  }
}

export default Product;
