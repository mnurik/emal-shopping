import React, { Component } from 'react'
import { FlatList } from 'react-native'
import Proptypes from 'prop-types'

import { fetchProducts } from './../utils/services'
import ListItem from '../components/List/ListItem'
import Separator from '../components/List/Separator'

export default class List extends Component {
  state = { products: [] }

  render() {
    return (
      <FlatList
        data={this.state.products}
        renderItem={({ item }) => (
          <ListItem text={`${item.Name} (${item.Count})`} onPress={() => this.handlePress(item.Name, item.Id)} />
        )}
        keyExtractor={item => item.Id}
        ItemSeparatorComponent={Separator}
      />
    )
  }

  componentDidMount() {
    fetchProducts(this.props.navigation.state.params.parent).then(products => this.setState({ products }))
  }

  handlePress = (title = '', parent = 0) => {
    // this.props.navigation.goBack(null)
    this.props.navigation.navigate('List', { title, parent })
  }
}

List.propTypes = {
  navigation: Proptypes.object
}
