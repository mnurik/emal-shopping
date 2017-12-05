import React, { Component } from 'react';
import { FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import Proptypes from 'prop-types';

import { fetchProducts, SERVER_URL } from './../utils/services';
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
  Thumbnail,
  Left,
  Body,
  Right,
  View
} from 'native-base';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  }
});

export default class ProductList extends Component {
  state = { products: [], pageNum: 1, newItems: false };

  loadProducts = pageNum => fetchProducts(this.props.navigation.state.params.parentId, pageNum);

  componentDidMount() {
    this.loadProducts().then(products => this.setState({ products, newItems: !(products.length < 10) }));
  }

  onEndReached = () => {
    this.setState(
      prevState => ({ pageNum: prevState.pageNum + 1 }),
      () => {
        try {
          this.loadProducts(this.state.pageNum).then(products =>
            this.setState(() => ({ products: this.state.products.concat(products), newItems: !!products.length }))
          );
        } catch (err) {
          console.log(err);
        }
      }
    );
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: '#dc4239' }} androidStatusBarColor="#dc2015" iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{ color: '#FFF' }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#FFF' }}>List Products</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List
            dataArray={this.state.products}
            renderRow={item => (
              <ListItem avatar onPress={() => this.props.navigation.navigate('Product', { productId: item.Id })}>
                <Left>
                  <Thumbnail small source={{ uri: `${SERVER_URL}img/${item.ImageURL}` }} />
                </Left>
                <Body>
                  <Text>{item.Name}</Text>
                  <Text numberOfLines={1} note>
                    {item.SupplierName}
                  </Text>
                  <Text numberOfLines={1} note>{`${item.Price} AZN`}</Text>
                </Body>
              </ListItem>
            )}
          />
          {this.state.newItems ? (
            <Button full transparent info onPress={this.onEndReached}>
              <Text>Load More...</Text>
            </Button>
          ) : null}
        </Content>
      </Container>
    );
  }
}

ProductList.propTypes = {
  navigation: Proptypes.object
};
