import React, { Component } from 'react'
import { FlatList, ActivityIndicator } from 'react-native'
import Proptypes from 'prop-types'

import { fetchGroups } from './../utils/services'
import ListItem from '../components/List/ListItem'
import Separator from '../components/List/Separator'

export default class GroupList extends Component {
  state = { groups: [], loading: true }

  render() {
    return this.state.loading ? (
      <ActivityIndicator size="small" />
    ) : (
      <FlatList
        data={this.state.groups}
        renderItem={({ item }) => (
          <ListItem text={`${item.Name} (${item.Count})`} onPress={e => this.handleItemClick(item)} />
        )}
        keyExtractor={item => item.Id}
        ItemSeparatorComponent={Separator}
      />
    )
  }

  componentDidMount() {
    fetchGroups(this.props.navigation.state.params.parentId).then(groups =>
      this.setState({
        groups,
        loading: false
      })
    )
  }

  handleItemClick = item => {
    if (item.IsContainer) {
      this.props.navigation.navigate('ProductList', { title: item.Name, groupId: item.Id })
    } else {
      this.props.navigation.navigate('GroupList', { title: item.Name, parentId: item.Id })
    }
  }
}

GroupList.propTypes = {
  navigation: Proptypes.object
}
