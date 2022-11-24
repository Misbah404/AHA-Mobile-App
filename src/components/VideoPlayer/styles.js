// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  videoView: {
    height: Metrics.feedsHeight,
  },
  loaderStyle: {
    position: 'absolute',
    top: 90,
    bottom: 10,
    right: 50,
    left: 50,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
