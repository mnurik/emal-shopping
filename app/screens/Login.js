import React, { Component } from 'react';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import Proptypes from 'prop-types';

import { auth } from './../utils/services';
import Container from '../components/Container/Container';
import Input from '../components/TextInput/Input';
import * as storage from './../utils/storage';
import styles from './../config/index.style';
import { Toast, Button, Text } from 'native-base';

export default class Home extends Component {
  state = { username: '', password: '' };

  componentWillMount() {
    storage.setItem('user', null);
  }

  handleLogin = () => {
    console.log('pressed log in');
    auth(this.state.username, this.state.password)
      .then(user => {
        if (user) {
          return storage.setItem('user', user);
        } else {
          throw 'Username or password is not correct';
        }
      })
      .then(() => {
        this.props.navigation.navigate('GroupList', { parentId: 0 });
      })
      .catch(text => {
        Toast.show({
          text,
          buttonText: 'Okay'
        });
        this.setState({ username: '', password: '' });
      });
  };

  render() {
    return (
      <Container>
        <KeyboardAvoidingView behavior="padding">
          <Input
            onChangeText={username => this.setState({ username })}
            placeholder="Enter username"
            keyboardType="email-address"
          />
          <Input
            onChangeText={password => this.setState({ password })}
            placeholder="Enter password"
            secureTextEntry={true}
          />
        </KeyboardAvoidingView>
        <Button
          rounded
          full
          info
          onPress={this.handleLogin}
          style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}
        >
          <Text>Log In</Text>
        </Button>
      </Container>
    );
  }
}

Home.propTypes = {
  navigation: Proptypes.object,
  dispatch: Proptypes.func
};
