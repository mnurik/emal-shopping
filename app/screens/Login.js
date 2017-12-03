import React, { Component } from 'react';
import { StatusBar, KeyboardAvoidingView, Text } from 'react-native';
import Proptypes from 'prop-types';

import { auth } from './../utils/services';
import Container from '../components/Container/Container';
import Logo from '../components/Logo/Logo';
import Input from '../components/TextInput/Input';
import Button from '../components/Buttons/Button';
import Header from '../components/Header/Header';
import * as storage from './../utils/storage';
import styles from './../config/index.style';
import { Toast } from 'native-base';

export default class Home extends Component {
  state = { username: '', password: '' };

  componentDidMount() {
    storage.setItem('user', null).then(() => {
      this.props.checkUser();
    });
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
        this.props.checkUser();
        this.props.history.push('/grouplist/0');
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
        <Button text="Log In" onPress={this.handleLogin} />
      </Container>
    );
  }
}

Home.propTypes = {
  navigation: Proptypes.object,
  dispatch: Proptypes.func
};
