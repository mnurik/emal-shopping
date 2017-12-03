import React, { Component } from 'react';
import { Root } from 'native-base';
import { View } from 'react-native';
import { NativeRouter, AndroidBackButton } from 'react-router-native';
import { DrawerNavigator } from 'react-navigation';
import Routes from './routes';
import SideMenu from './components/SideMenu/SideMenu';
import Login from './screens/Login';
import GroupList from './screens/GroupList';
import Discounts from './screens/Discounts';
import { getItem } from './utils/storage';
import SideBar from './components/sidebar';

const AppNavigator = DrawerNavigator(
  {
    Login: { screen: Login },
    GroupList: { path: 'grouplist/:parentId', screen: GroupList },
    Discounts: { screen: Discounts }
  },
  {
    initialRouteName: 'GroupList',
    contentOptions: {
      activeTintColor: '#e91e63'
    },
    contentComponent: props => <SideBar {...props} />
  }
);

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
      <Root>
        {/* <NativeRouter onUpdate={this.handleUpdate}>
          <AndroidBackButton>
            <SideMenu {...this.state}>
              <Routes checkUser={this.checkUser} />
            </SideMenu>
          </AndroidBackButton>
        </NativeRouter> */}
        <AppNavigator />
      </Root>
    );
  }
}
