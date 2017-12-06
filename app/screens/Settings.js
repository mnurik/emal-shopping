import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  Text,
  Badge,
  Left,
  Right,
  Body,
  Switch,
  Radio,
  Picker,
  Separator,
  Form
} from 'native-base';
import Proptypes from 'prop-types';
import { getGeneratedCodes } from './../utils/services';
import * as storage from './../utils/storage';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  }
});

const Item = Picker.Item;

export default class Settings extends Component {
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
            <Title style={{ color: '#FFF' }}>Languages</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: '#8F8E93' }}>
                <Icon active name="cog" />
              </Button>
            </Left>
            <Body>
              <Form>
                <Picker
                  mode="dropdown"
                  style={{ width: Platform.OS === 'ios' ? undefined : 200 }}
                  placeholder="Languages"
                  renderHeader={backAction => (
                    <Header
                      style={{ backgroundColor: '#dc4239' }}
                      androidStatusBarColor="#dc2015"
                      iosBarStyle="light-content"
                    >
                      <Left>
                        <Button transparent onPress={backAction}>
                          <Icon name="arrow-back" style={{ color: '#fff' }} />
                        </Button>
                      </Left>
                      <Body>
                        <Title style={{ color: '#FFF' }}>Select Language</Title>
                      </Body>
                      <Right />
                    </Header>
                  )}
                >
                  <Item label="Azerbaijani" value="key0" />
                  <Item label="English" value="key1" />
                </Picker>
              </Form>
            </Body>
            <Right>{Platform.OS === 'ios' && <Icon active name="arrow-forward" />}</Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
