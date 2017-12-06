import React, { Component } from 'react';
import { Image } from 'react-native';
import { getItem } from './../../utils/storage';
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
  Button,
  View,
  StyleProvider,
  getTheme,
  variables
} from 'native-base';

import styles from './style';

const drawerCover = require('../../img/drawer-cover.png');

const drawerImage = require('../../img/logo-kitchen-sink.png');

const common = [];

const unauthorized = [
  {
    name: 'Login',
    route: 'Login',
    icon: 'ios-log-in',
    bg: '#C5F442'
  },
  {
    name: 'GroupList',
    route: 'GroupList',
    icon: 'cart',
    bg: '#C5F442'
  }
];

const authorized = [
  {
    name: 'Profile',
    route: 'Profile',
    icon: 'ios-person',
    bg: '#C5F442'
  },
  {
    name: 'GroupList',
    route: 'GroupList',
    icon: 'cart',
    bg: '#C5F442'
  },
  {
    name: 'Discounts',
    route: 'Discounts',
    icon: 'archive',
    bg: '#C5F442'
  },
  {
    name: 'Settings',
    route: 'Settings',
    icon: 'settings',
    bg: '#C5F442'
  },
  {
    name: 'SignOut',
    route: 'Login',
    icon: 'ios-log-out',
    bg: '#C5F442'
  }
];

class SideBar extends Component {
  state = {
    shadowOffsetWidth: 1,
    shadowRadius: 4,
    authorized: false
  };

  componentDidMount() {
    getItem('user').then(user => this.setState({ authorized: !!user }));
  }

  componentWillReceiveProps() {
    getItem('user').then(user => this.setState({ authorized: !!user }));
  }

  render() {
    return (
      <Container>
        <Content bounces={false} style={{ flex: 1, backgroundColor: '#fff', top: -1 }}>
          <Image source={drawerCover} style={styles.drawerCover}>
            <Image square style={styles.drawerImage} source={drawerImage} />
          </Image>
          <List
            dataArray={this.state.authorized ? authorized : unauthorized}
            renderRow={data => (
              <ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
                <Left>
                  <Icon active name={data.icon} style={{ color: '#777', fontSize: 26, width: 30 }} />
                  <Text style={styles.text}>{data.name}</Text>
                </Left>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
