import React, { Component } from 'react'
import { StatusBar, KeyboardAvoidingView } from 'react-native'
import Proptypes from 'prop-types'

import { auth } from './../utils/services'
import * as storage from './../utils/storage'
import Container from '../components/Container/Container'
import Logo from '../components/Logo/Logo'
import Input from '../components/TextInput/Input'
import Button from '../components/Buttons/Button'
import LastConverted from '../components/Text/LastConverted'
import Header from '../components/Header/Header'

export default class Home extends Component {
  state = { username: '', password: '' }

  render() {
    return (
      <Container>
        <StatusBar translucent={false} />
        <KeyboardAvoidingView behavior="padding">
          <Input onChangeText={val => this.setState({ username: val })} />
          <Input onChangeText={val => this.setState({ password: val })} />
        </KeyboardAvoidingView>
        <Button text="Log In" onPress={this.handleLogin} />
      </Container>
    )
  }

  handleLogin = () => {
    console.log('pressed log in')
    auth(this.state.username, this.state.password)
      .then(response => storage.setItem('id', response.Id))
      .then(() => {
        this.props.navigation.navigate('GroupList', { title: 'Product List' })
      })
  }
}

Home.propTypes = {
  navigation: Proptypes.object,
  dispatch: Proptypes.func
}
