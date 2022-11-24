// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  flatListContStyle: {
    paddingBottom: 130,
    ...AppStyles.mTop10,
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
});
