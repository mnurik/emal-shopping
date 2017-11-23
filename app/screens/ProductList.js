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
  state = { products: [] };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.products.List}
          renderItem={({ item }) => (
            <ListItem
              url={`/product/${item.Id}`}
              text={`${item.Name} - ${item.Price} AZN`}
              imgSrc={`${item.SERVER_URL}img/${item.ImageURL}`}
            />
          )}
          keyExtractor={item => item.Id}
          ItemSeparatorComponent={Separator}
        />
      </View>
    );
  }

  componentDidMount() {
    fetchProducts(this.props.match.params.groupId).then(products => this.setState({ products }));
  }
}

ProductList.propTypes = {
  navigation: Proptypes.object
};
