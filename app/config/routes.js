import { StackNavigator } from 'react-navigation'
import { StatusBar } from 'react-native'

import Login from '../screens/Login'
import GroupList from '../screens/GroupList'
import ProductList from '../screens/ProductList'
import Product from '../screens/Product'
import Themes from '../screens/Themes'

const LoginStack = StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    headerMode: 'none'
  }
)

export default StackNavigator({
  Login: {
    screen: LoginStack
  },
  GroupList: {
    screen: GroupList,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.state.params.title
    })
  },
  ProductList: {
    screen: ProductList,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.state.params.title
    })
  },
  Product: {
    screen: Product
  }
})
