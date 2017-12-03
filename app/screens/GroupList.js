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
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    console.log('you are here');
    console.log(this.props);
    this.fetchData();
  }

  handleClick = ({ url, parentId }) => {
    console.log(url, parentId, 'yep bitch');
    this.props.navigation.navigate(url, { parentId });
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            {true ? (
              <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                <Icon name="menu" />
              </Button>
            ) : (
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            )}
          </Left>
          <Body>
            <Title>Basic List</Title>
          </Body>
          <Right />
        </Header>

        <Content>
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
        </Content>
      </Container>
    );
  }
}

GroupList.propTypes = {
  navigation: Proptypes.object
};
