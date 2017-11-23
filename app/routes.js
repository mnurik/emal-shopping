import React from 'react'
import { View } from 'react-native'
import { Redirect, Route, Switch, withRouter } from 'react-router-native'
import Login from './screens/Login'
import GroupList from './screens/GroupList'
import ProductList from './screens/ProductList'
import SideMenu from './components/SideMenu/SideMenu'

const Routes = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/grouplist/:groupId" component={GroupList} />
    <Route path="/productlist/:productId" component={ProductList} />
    <Redirect from="/" to="/login" />
  </Switch>
)

export default withRouter(Routes)
