import React, { Component } from 'react';
import { StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Proptypes from 'prop-types';
import { getProduct, getAddress, generateCode, getImages } from './../utils/services';
import openMap from 'react-native-open-maps';
import * as storage from './../utils/storage';
import Carousel from './../components/Carousel/Carousel';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Body,
  Item,
  Input,
  H1,
  H3
} from 'native-base';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  }
});

class Product extends Component {
  state = {
    product: {},
    addresses: [],
    images: []
  };

  componentDidMount() {
    try {
      const { productId } = this.props.navigation.state.params;
      getProduct(productId).then(product =>
        this.setState({ product }, () => {
          getAddress(productId, this.state.product['FK_SP_Supplier']).then(addresses => this.setState({ addresses }));
          getImages(productId).then(images => this.setState({ images }));
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  handleGenerateCode = async productName => {
    const user = await storage.getItem('user');
    if (user) {
      try {
        const { productId } = this.props.navigation.state.params;
        generateCode(productId, user.Id).then(res => {
          Alert.alert('Discount Title', `You get discount for ${productName} successfully`, [{ text: 'OK' }], {
            cancelable: false
          });
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert('Discount Title', 'You should login', [{ text: 'OK' }], { cancelable: false });
    }
  };

  openMap = (latitude = 0, longitude = 0) => {
    openMap({ latitude, longitude });
  };

  render() {
    const { product, images, addresses } = this.state;
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: '#dc4239' }} androidStatusBarColor="#dc2015" iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{ color: '#FFF' }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#FFF' }}>Product Details</Title>
          </Body>
          <Right />
        </Header>

        {product.hasOwnProperty('Id') ? (
          <Content>
            <Carousel entries={images} />
            <H1 style={{ textAlign: 'center', marginTop: 10 }}>{product.Name}</H1>
            <H3 style={{ textAlign: 'center', marginTop: 10 }}>{product.Price + ' AZN'}</H3>
            <Button onPress={() => this.handleGenerateCode(product.Name)} style={{ marginTop: 10 }} full success>
              <Text>Get Discount</Text>
            </Button>
            <List
              dataArray={addresses}
              renderRow={item => (
                <ListItem button onPress={() => this.openMap(item.Lat, item.Long)}>
                  <Body>
                    <Text>{item.Address}</Text>
                  </Body>
                  <Right>
                    <Icon name="ios-redo-outline" />
                  </Right>
                </ListItem>
              )}
            />
          </Content>
        ) : (
          <ActivityIndicator style={{ paddingTop: 120 }} />
        )}
      </Container>
    );
  }
}

export default Product;
