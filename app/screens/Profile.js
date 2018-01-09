import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Image } from 'react-native';
import { Container, Title, Content, Text, Button, Icon, Left, Right, Body, Thumbnail, View, Row } from 'native-base';

import { SERVER_URL } from './../utils/services';
import { getItem } from './../utils/storage';
import Header from './../components/Header/Header';
import otherStyles from './../components/sidebar/style';
import styles from './../style/index';

const profileImage = require('./../img/no-photo.jpg');
const drawerCover = require('./../img/drawer-cover.png');

export default class Profile extends Component {
  state = { user: {} };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    })
  };

  componentDidMount() {
    getItem('user').then(user => this.setState({ user }));
  }

  render() {
    const { user } = this.state;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="ios-menu" style={styles.whiteFont} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.whiteFont}>Profile</Title>
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
