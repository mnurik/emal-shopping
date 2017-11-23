import React, { Component } from 'react'
import SideMenu from 'react-native-side-menu'
import Menu from './Menu'

export default class SideMenuComponent extends Component {
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  updateMenuState = isOpen => {
    this.setState({ isOpen })
  }

  onMenuItemSelected = () => {
    this.setState({
      isOpen: false
    })
  }

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />

    return (
      <SideMenu menu={menu} isOpen={this.state.isOpen} onChange={isOpen => this.updateMenuState(isOpen)}>
        {this.props.children}
      </SideMenu>
    )
  }
}
