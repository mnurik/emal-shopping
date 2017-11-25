import React, { Component } from 'react';
import { View } from 'react-native';
import { NativeRouter, AndroidBackButton } from 'react-router-native';

import Routes from './app/routes';
import SideMenu from './app/components/SideMenu/SideMenu';
import Login from './app/screens/Login';

export default class App extends Component {
  render() {
    return (
      <NativeRouter>
        <AndroidBackButton>
          <SideMenu>
            <Routes />
          </SideMenu>
        </AndroidBackButton>
      </NativeRouter>
    );
  }
}
