import React, { Component } from 'react';
import { View } from 'react-native';
import { NativeRouter, AndroidBackButton } from 'react-router-native';

import Routes from './app/routes';
import SideMenu from './app/components/SideMenu/SideMenu';
import Login from './app/screens/Login';
import { getItem } from './app/utils/storage';

export default class App extends Component {
  state = { authorized: false };

  componentDidMount() {
    this.checkUser();
  }

  checkUser = () => {
    getItem('user').then(user => this.setState({ authorized: !!user }));
  };

  render() {
    return (
      <NativeRouter onUpdate={this.handleUpdate}>
        <AndroidBackButton>
          <SideMenu {...this.state}>
            <Routes checkUser={this.checkUser} />
          </SideMenu>
        </AndroidBackButton>
      </NativeRouter>
    );
  }
}
