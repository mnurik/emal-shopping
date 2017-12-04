import colors from '../../config/style';
import { StyleSheet } from 'react-native';

export default (style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryBlue,
    padding: 20
  }
}));
