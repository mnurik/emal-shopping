import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StatusBar } from 'react-native';
import { Container, Title, Content, Button, Icon, List, ListItem, Text, Left, Right, Body, Item } from 'native-base';

import Header from './../components/Header/Header';
import { fetchGroups, insertLogs } from './../utils/services';
import styles from './../style/index';

export default class GroupList extends Component {
  state = { groups: [], loading: true, path: '' };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      state: PropTypes.shape({
        params: PropTypes.shape({
          parentId: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired
        })
      }).isRequired
    }).isRequired
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Group List',
    headerBackTitle: null,
    headerStyle: { backgroundColor: '#dc4239' },
    headerTitleStyle: { color: '#fff' },
    headerTintColor: '#fff',
    headerRight: (
      <Button transparent>
        <Icon name="search" style={styles.whiteFont} />
      </Button>
    ),
    headerLeft: navigation.state.params ? (
      undefined
    ) : (
      <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon name="ios-menu" style={styles.whiteFont} />
      </Button>
    )
  });

  fetchData = parentId => {
    this.setState({ loading: true });
    fetchGroups(parentId).then(groups => this.setState({ groups, loading: false }));
  };

  componentDidMount() {
    let parentId;
    if (this.props.navigation.state.hasOwnProperty('params')) {
      let path = this.props.navigation.state.params.name;
      parentId = this.props.navigation.state.params.parentId;
      this.setState({ path });
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
        {this.state.path ? (
          <Header>
            <Text style={styles.whiteFont}>{this.state.path}</Text>
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
