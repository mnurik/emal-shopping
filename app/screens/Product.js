import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
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
  Input
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

  handleGenerateCode = () => {
    storage.getItem('user').then(user => {
      if (user) {
        try {
          const { productId } = this.props.navigation.state.params;
          generateCode(productId, user.Id).then(res => {
            Alert.alert('Discount Title', 'You get discount successfully', [{ text: 'OK' }], { cancelable: false });
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        Alert.alert('Discount Title', 'You should login', [{ text: 'OK' }], { cancelable: false });
      }
    });
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
            <Title style={{ color: '#FFF' }}>Basic List</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Carousel entries={images} />
          <Button onPress={this.handleGenerateCode} full success>
            <Text>Get Discount</Text>
          </Button>
          <List
            dataArray={addresses}
            renderRow={item => (
              <ListItem button onPress={() => openMap({ latitude: item.Lat, longitude: item.Long })}>
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
      </Container>
    );
  }
}

export default Product;
