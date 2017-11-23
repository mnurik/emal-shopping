import React, { Component } from 'react'
import { FlatList, ActivityIndicator, StyleSheet, View } from 'react-native'
import { Link, Text } from 'react-router-native'
import Proptypes from 'prop-types'

import { fetchGroups } from './../utils/services'
import ListItem from '../components/List/ListItem'
import Separator from '../components/List/Separator'
import Container from '../components/Container/Container'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  }
})

export default class GroupList extends Component {
  state = { groups: [] }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.groups}
          renderItem={({ item }) => <ListItem url={`/grouplist/${item.Id}`} text={`${item.Name} (${item.Count})`} />}
          keyExtractor={item => item.Id}
          ItemSeparatorComponent={Separator}
        />
      </View>
    )
  }

  componentDidMount() {
    fetchGroups(this.props.match.params.groupId).then(groups =>
      this.setState({
        groups
      })
    )
  }
}

GroupList.propTypes = {
  navigation: Proptypes.object
}
