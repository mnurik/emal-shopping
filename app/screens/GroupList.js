import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
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
  state = { groups: [], loading: true, path: [] };

  fetchData = parentId => {
    this.setState({ loading: true });
    fetchGroups(parentId).then(groups => this.setState({ groups, loading: false }));
  };

  componentDidMount() {
    this.fetchData(0);
  }

  async componentWillReceiveProps(nextProps) {
    const { parentId, name } = nextProps.navigation.state.params;
    try {
      const user = await getItem('user');
      const customerId = user ? user.Id : 0;
      insertLogs(parentId, customerId);
      this.setState(prevState => ({ path: prevState.path.concat([name]) }));
      this.fetchData(parentId);
    } catch (err) {
      console.log(err);
    }
  }

  handleClick = (url, params) => {
    this.props.navigation.navigate(url, params);
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: '#dc4239' }} androidStatusBarColor="#dc2015" iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="menu" style={{ color: '#FFF' }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#FFF' }}>Group List</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="search" style={{ color: '#FFF' }} />
            </Button>
          </Right>
        </Header>

        {this.state.path.length ? (
          <Header style={{ backgroundColor: '#dc4239' }} androidStatusBarColor="#dc2015" iosBarStyle="light-content">
            {/* <Left>
              <Button transparent>
                <Icon name="arrow-back" style={{ color: '#FFF' }} onPress={() => this.props.navigation.goBack()} />
              </Button>
            </Left> */}
            <Text style={{ color: '#FFF' }}>{this.state.path.join(' / ')}</Text>
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
                      name: item.Name
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
