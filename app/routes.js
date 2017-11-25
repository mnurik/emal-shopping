import React from 'react';
import { View } from 'react-native';
import { Route, Switch, withRouter, StackRoute } from 'react-router-native';
import Login from './screens/Login';
import GroupList from './screens/GroupList';
import ProductList from './screens/ProductList';
import Product from './screens/Product';
import SideMenu from './components/SideMenu/SideMenu';
import Header from './components/Header/Header';

const Home = () => (
  <Switch>
    <View>
      <Header />
    </View>
  </Switch>
);

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/grouplist/:parentId" component={GroupList} />
    <Route path="/productlist/:groupId" component={ProductList} />
    <Route path="/product/:productId" component={Product} />
  </Switch>
);

export default Routes;
