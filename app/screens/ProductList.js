import React, { Component } from 'react';
import { FlatList, ActivityIndicator, StyleSheet, View } from 'react-native';
import Proptypes from 'prop-types';

import { fetchProducts, SERVER_URL } from './../utils/services';
import ListItem from '../components/List/ListItem';
import Separator from '../components/List/Separator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingTop: 30
  }
});

export default class ProductList extends Component {
  state = { products: [], pageNum: 1, waiting: false };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.products}
          renderItem={({ item }) => (
            <ListItem
              url={`/product/${item.Id}`}
              text={`${item.Name} - ${item.Price} AZN`}
              imgSrc={`${SERVER_URL}img/${item.ImageURL}`}
            />
          )}
          keyExtractor={item => item.Id}
          ItemSeparatorComponent={Separator}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.3}
          renderFooter={<ActivityIndicator animating={this.state.waiting} />}
        />
      </View>
    );
  }

  componentDidMount() {
    fetchProducts(this.props.match.params.groupId).then(products => this.setState({ products }));
  }

  onEndReached = () => {
    this.setState(
      prevState => ({ pageNum: prevState.pageNum + 1, waiting: true }),
      () => {
        fetchProducts(this.props.match.params.groupId, this.state.pageNum).then(products =>
          this.setState(() => ({ products: this.state.products.concat(products), waiting: false }))
        );
      }
    );
  };
}

ProductList.propTypes = {
  navigation: Proptypes.object
};
