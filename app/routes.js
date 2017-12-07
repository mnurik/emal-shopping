import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import Login from './screens/Login';
import GroupList from './screens/GroupList';
import ProductList from './screens/ProductList';
import Discounts from './screens/Discounts';
import Settings from './screens/Settings';
import Product from './screens/Product';
import SideBar from './components/sidebar';
import Profile from './screens/Profile';

const GroupListStack = StackNavigator(
  {
    GroupList: { screen: GroupList }
  },
  { headerMode: 'screen' }
);

const AppNavigator = DrawerNavigator(
  {
    Login: { screen: Login },
    Discounts: { screen: Discounts },
    Settings: { screen: Settings },
    Profile: { screen: Profile },
    GroupList: { path: 'grouplist/:parentId', screen: GroupListStack },
    ProductList: { path: 'productlist/:groupId', screen: ProductList },
    Product: { path: 'product/:productId', screen: Product }
  },
  {
    initialRouteName: 'GroupList',
    contentOptions: {
      activeTintColor: '#e91e63'
    },
    contentComponent: props => <SideBar {...props} />
  }
);

export default AppNavigator;
