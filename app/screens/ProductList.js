import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, ActivityIndicator } from 'react-native';
import { Container, Title, Content, Button, List, ListItem, Text, Thumbnail, Left, Body } from 'native-base';

import { fetchProducts, SERVER_URL } from './../utils/services';
import Header from './../components/Header/Header';
import styles from './../style/index';

export default class ProductList extends Component {
  state = { products: [], pageNum: 1, newItems: false, loading: true };

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          parentId: PropTypes.number.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  };

  loadProducts = pageNum => fetchProducts(this.props.navigation.state.params.parentId, pageNum);

  componentDidMount() {
    this.loadProducts().then(products => this.setState({ products, newItems: products.length === 10, loading: false }));
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
        <Header title="List Products" navigation={this.props.navigation} />
        <Content>
          {this.state.loading ? (
            <ActivityIndicator size="large" style={{ marginVertical: 100 }} />
          ) : (
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
                    <Text numberOfLines={1} note style={{ color: '#C12127' }}>{`${item.Price} AZN`}</Text>
                  </Body>
                </ListItem>
              )}
            />
          )}
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
