import React, { Component } from 'react';
import { Root } from 'native-base';
import AppNavigator from './routes';

export default class App extends Component {
  render() {
    return (
      <Root>
        <AppNavigator />
      </Root>
    );
  }
}
