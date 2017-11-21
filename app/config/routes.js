import { StackNavigator } from 'react-navigation'
import { StatusBar } from 'react-native'

import Login from '../screens/Login'
import List from '../screens/List'
import Options from '../screens/Options'
import Themes from '../screens/Themes'

const HomeStack = StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    Options: {
      screen: Options,
      navigationOptions: {
        headerTitle: 'Options'
      }
    },
    Themes: {
      screen: Themes,
      navigationOptions: {
        headerTitle: 'Themes'
      }
    }
  },
  {
    headerMode: 'screen'
  }
)

const ListStack = StackNavigator({
  List: {
    screen: List,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.state.params.title
    })
  }
})

export default StackNavigator(
  {
    Login: {
      screen: Login
    },
    List: {
      screen: ListStack
    }
  },
  {
    headerMode: 'none'
  }
)
