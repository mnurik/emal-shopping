import React, { Component } from 'react'
import { addNavigationHelpers } from 'react-navigation'

import Navigator from './app/config/routes'

export default class App extends Component {
  render() {
    return <Navigator />
  }
}
