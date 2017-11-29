import React from 'react'
import { View } from 'react-native'
import { Route, Switch, withRouter, StackRoute, Redirect } from 'react-router-native'
import Login from './screens/Login'
import GroupList from './screens/GroupList'
import ProductList from './screens/ProductList'
import Product from './screens/Product'
import SideMenu from './components/SideMenu/SideMenu'
import Header from './components/Header/Header'
import Discounts from './screens/Discounts'
import Profile from './screens/Profile'

const Routes = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/profile" component={Profile} />
    <Route path="/grouplist/:parentId" component={GroupList} />
    <Route path="/productlist/:groupId" component={ProductList} />
    <Route path="/product/:productId" component={Product} />
    <Route path="/discounts" component={Discounts} />
    <Redirect from="/" to="grouplist/0" />
  </Switch>
)

export default Routes
