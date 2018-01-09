import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { Container, Title, Content, Button, Icon, ListItem, Left, Right, Body, Picker, Form } from 'native-base';

import Header from './../components/Header/Header';
import styles from './../style/index';

export default class Settings extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    })
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="menu" style={styles.whiteFont} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.whiteFont}>Languages</Title>
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
                  onValueChange={() => {}}
                  renderHeader={backAction => (
                    <Header
                      style={{ backgroundColor: '#dc4239' }}
                      androidStatusBarColor="#dc2015"
                      iosBarStyle="light-content"
                    >
                      <Left>
                        <Button transparent onPress={backAction}>
                          <Icon name="arrow-back" style={styles.whiteFont} />
                        </Button>
                      </Left>
                      <Body>
                        <Title style={styles.whiteFont}>Select Language</Title>
                      </Body>
                      <Right />
                    </Header>
                  )}
                >
                  <Picker.Item label="Azerbaijani" value="aze" />
                  <Picker.Item label="English" value="eng" />
                </Picker>
              </Form>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
