import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import Proptypes from 'prop-types';
import { SERVER_URL } from './../utils/services';
import * as storage from './../utils/storage';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  H3,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  ListItem,
  Thumbnail,
  View
} from 'native-base';
const profileImage = require('./../img/no-photo.jpg');

export default class Profile extends Component {
  state = { user: {} };

  componentDidMount() {
    storage.getItem('user').then(user => this.setState({ user }));
  }

  render() {
    const { user } = this.state;
    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <Header style={{ backgroundColor: '#dc4239' }} androidStatusBarColor="#dc2015" iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="ios-menu" style={{ color: '#FFF' }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#FFF' }}>Profile</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <View style={{ alignItems: 'center' }}>
            <Thumbnail large source={profileImage} />
          </View>
          <Body style={{ alignItems: 'center' }}>
            <Text>{user.Name}</Text>
          </Body>
          <ListItem>
            <Body style={{ alignItems: 'center' }}>
              <Text>{user.BirthDay}</Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body style={{ alignItems: 'center' }}>
              <Text>{user.Phone}</Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body style={{ alignItems: 'center' }}>
              <Text>{user.Address}</Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body style={{ alignItems: 'center' }}>
              <Text>{user.UserName}</Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body style={{ alignItems: 'center' }}>
              <Text>{user.Password}</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
