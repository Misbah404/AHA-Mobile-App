// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  loaderStyle: {
    alignSelf: 'center',
    flex: 1,
  },
  emptyViewSec: {
    height: Metrics.screenHeight - (Metrics.screenHeight * 35) / 100,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
