import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import * as storage from './../../utils/storage';

export default class SideMenuComponent extends Component {
  state = { isOpen: false, authorized: false };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  updateMenuState = isOpen => {
    this.setState({ isOpen });
    storage.getItem('user').then(user => this.setState({ authorized: !!user }));
  };

  onMenuItemSelected = () => {
    this.setState({ isOpen: false });
  };

  componentWillReceiveProps() {
    console.log('new props coming...');
  }

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} authorized={this.state.authorized} />;

    return (
      <SideMenu menu={menu} isOpen={this.state.isOpen} onChange={isOpen => this.updateMenuState(isOpen)}>
        {this.props.children}
      </SideMenu>
    );
  }
}
