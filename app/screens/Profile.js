import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
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
  View,
  Row
} from 'native-base';
import otherStyles from './../components/sidebar/style';
const profileImage = require('./../img/no-photo.jpg');
const drawerCover = require('./../img/drawer-cover.png');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  imageContainer: { alignItems: 'center', marginVertical: 50 },
  row: { padding: 10 },
  icon: { width: '20%', textAlign: 'center' },
  text: { width: '80%', textAlign: 'center' }
});

export default class Profile extends Component {
  state = { user: {} };

  componentDidMount() {
    storage.getItem('user').then(user => this.setState({ user }));
  }

  render() {
    const { user } = this.state;
    return (
      <Container style={styles.container}>
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

        <Content style={{ flex: 1, backgroundColor: '#fff', top: -1 }}>
          <Image source={drawerCover} style={otherStyles.drawerCover}>
            <View style={styles.imageContainer}>
              <Thumbnail large source={profileImage} />
              <Text style={{ fontSize: 22, backgroundColor: 'transparent', color: '#FFF', paddingTop: 10 }}>
                {user.Name}
              </Text>
            </View>
          </Image>
          <Row style={styles.row}>
            <Icon name="ios-calendar-outline" style={styles.icon} />
            <Text style={styles.text}>{user.Birthday && user.Birthday.split('T')[0]}</Text>
          </Row>
          <Row style={styles.row}>
            <Icon name="ios-call-outline" style={styles.icon} />
            <Text style={styles.text}>{user.Phone}</Text>
          </Row>
          <Row style={styles.row}>
            <Icon style={styles.icon} name="ios-home-outline" />
            <Text style={styles.text}>{user.Address}</Text>
          </Row>
          <Row style={styles.row}>
            <Icon style={styles.icon} name="ios-at-outline" />
            <Text style={styles.text}>{user.UserName}</Text>
          </Row>
          <Row style={styles.row}>
            <Icon style={styles.icon} name="key" />
            <Text style={styles.text}>{user.Password}</Text>
          </Row>
        </Content>
      </Container>
    );
  }
}
