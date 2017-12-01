import React, { Component } from 'react';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import Proptypes from 'prop-types';

import { auth } from './../utils/services';
import Container from '../components/Container/Container';
import Logo from '../components/Logo/Logo';
import Input from '../components/TextInput/Input';
import Button from '../components/Buttons/Button';
import LastConverted from '../components/Text/LastConverted';
import Header from '../components/Header/Header';
import * as storage from './../utils/storage';

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
      .then(user => storage.setItem('user', user))
      .then(() => {
        this.props.checkUser();
        this.props.history.push('/grouplist/0');
      });
  };

  render() {
    return (
      <Container>
        <StatusBar translucent={false} />
        <KeyboardAvoidingView behavior="padding">
          <Input onChangeText={username => this.setState({ username })} />
          <Input onChangeText={password => this.setState({ password })} />
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
