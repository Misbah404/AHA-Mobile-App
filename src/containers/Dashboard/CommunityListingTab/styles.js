import {StyleSheet} from 'react-native';
import {Colors} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  loaderStyle: {
    position: 'absolute',
    top: 50,
    bottom: 50,
    right: 50,
    left: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataFoundSec: {
    marginTop: 100,
  },
});
