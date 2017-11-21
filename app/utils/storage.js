import { AsyncStorage, Alert } from 'react-native'

export const getItem = name => {
  return AsyncStorage.getItem(name).then(json => {
    try {
      return JSON.parse(json)
    } catch (e) {
      Alert.alert('Alert Title', e.message, [{ text: 'Ok', onPress: () => console.log(':(') }], { cancelable: false })
    }
  })
}

export const setItem = (name, data) => {
  return AsyncStorage.setItem(name, JSON.stringify(data))
}
