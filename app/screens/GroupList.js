import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import Proptypes from 'prop-types';
import { fetchGroups, insertLogs } from './../utils/services';
import { getItem } from './../utils/storage';
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

export default class GroupList extends Component {
  state = { groups: [], loading: true, path: '' };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Group List',
      headerBackTitle: null,
      headerStyle: { backgroundColor: '#dc4239' },
      headerTitleStyle: { color: '#fff' },
      headerTintColor: '#fff',
      headerRight: (
        <Button transparent>
          <Icon name="search" style={{ color: '#FFF' }} />
        </Button>
      ),
      headerLeft: navigation.state.params ? (
        undefined
      ) : (
        <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
          <Icon name="ios-menu" style={{ color: '#FFF' }} />
        </Button>
      )
    };
  };

  fetchData = parentId => {
    this.setState({ loading: true });
    fetchGroups(parentId).then(groups => this.setState({ groups, loading: false }));
  };

  componentDidMount() {
    let parentId;
    if (this.props.navigation.state.params) {
      parentId = this.props.navigation.state.params.parentId;
      this.setState({ path: this.props.navigation.state.params.name });
    }
    this.fetchData(parentId);
  }

  handleClick = (url, params) => {
    this.props.navigation.navigate(url, params);
  };

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar barStyle="light-content" />
        {this.state.path.length ? (
          <Header style={{ backgroundColor: '#dc4239' }} androidStatusBarColor="#dc2015" iosBarStyle="light-content">
            <Text style={{ color: '#FFF' }}>{this.state.path}</Text>
          </Header>
        ) : null}

        <Content>
          {this.state.loading ? (
            <ActivityIndicator size="large" style={{ marginVertical: 100 }} />
          ) : (
            <List
              dataArray={this.state.groups}
              renderRow={item => (
                <ListItem
                  button
                  onPress={() =>
                    this.handleClick(item.IsContainer ? `ProductList` : `GroupList`, {
                      parentId: item.Id,
                      name: `${this.state.path}/${item.Name}`
                    })
                  }
                >
                  <Body>
                    <Text>{`${item.Name} (${item.Count})`}</Text>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              )}
            />
          )}
        </Content>
      </Container>
    );
  }
}

GroupList.propTypes = {
  navigation: Proptypes.object
};
