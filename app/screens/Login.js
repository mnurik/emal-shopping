import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toast, Button, Text } from 'native-base';
import { StatusBar, KeyboardAvoidingView } from 'react-native';

import { auth } from './../utils/services';
import Container from '../components/Container/Container';
import Input from '../components/TextInput/Input';
import { setItem } from './../utils/storage';
import styles from './../style/index.style';

export default class Login extends Component {
  state = { username: '', password: '' };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired
  };

  componentWillMount() {
    setItem('user', null);
  }

  handleLogin = () => {
    auth(this.state.username, this.state.password)
      .then(user => {
        if (user) {
          return setItem('user', user);
        } else {
          throw 'Username or password is not correct';
        }
      })
      .then(() => this.props.navigation.navigate('GroupList', { parentId: 0 }))
      .catch(text => {
        Toast.show({
          text,
          type: 'danger',
          duration: '3000',
          position: 'top',
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
            value={this.state.username}
          />
          <Input
            onChangeText={password => this.setState({ password })}
            placeholder="Enter password"
            secureTextEntry={true}
            value={this.state.password}
          />
        </KeyboardAvoidingView>
        <Button
          rounded
          full
          success
          onPress={this.handleLogin}
          style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}
        >
          <Text>Log In</Text>
        </Button>
      </Container>
    );
  }
}
