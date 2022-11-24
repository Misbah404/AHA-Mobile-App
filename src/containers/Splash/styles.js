// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  imgStyle: {
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
});
