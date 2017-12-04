import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Proptypes from 'prop-types';
import { fetchGroups } from './../utils/services';
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
  state = { groups: [], loading: true };

  fetchData = parentId => {
    this.setState({ loading: true });
    fetchGroups(parentId).then(groups => this.setState({ groups, loading: false }));
  };

  componentDidMount() {
    this.fetchData(0);
  }

  componentWillReceiveProps(nextProps) {
    try {
      this.fetchData(nextProps.navigation.state.params.parentId);
    } catch (err) {
      console.log(err);
    }
  }

  handleClick = ({ url, parentId }) => {
    this.props.navigation.navigate(url, { parentId });
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: '#dc4239' }} androidStatusBarColor="#dc2015" iosBarStyle="light-content">
          <Left>
            {true ? (
              <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                <Icon name="menu" style={{ color: '#FFF' }} />
              </Button>
            ) : (
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" style={{ color: '#FFF' }} />
              </Button>
            )}
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
                    this.handleClick({ url: item.IsContainer ? `ProductList` : `GroupList`, parentId: item.Id })
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
