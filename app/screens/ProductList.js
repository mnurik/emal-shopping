import React, { Component } from 'react'
import { FlatList, ActivityIndicator } from 'react-native'
import Proptypes from 'prop-types'

import { fetchProducts, SERVER_URL } from './../utils/services'
import ListItem from '../components/List/ListItem'
import Separator from '../components/List/Separator'

export default class ProductList extends Component {
  state = { products: [], loading: true }

  render() {
    return this.state.loading ? (
      <ActivityIndicator size="small" />
    ) : (
      <FlatList
        data={this.state.products.List}
        renderItem={({ item }) => (
          <ListItem
            text={`${item.Name} - ${item.Price} AZN`}
            imgSrc={`${item.SERVER_URL}img/${item.ImageURL}`}
            onPress={e => this.props.navigation.navigate('Product', { productId: item.Id })}
          />
        )}
        keyExtractor={item => item.Id}
        ItemSeparatorComponent={Separator}
      />
    )
  }

  componentDidMount() {
    fetchProducts(this.props.navigation.state.params.groupId).then(products =>
      this.setState({ products, loading: false })
    )
  }
}

ProductList.propTypes = {
  navigation: Proptypes.object
}
