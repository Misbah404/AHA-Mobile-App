// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  roundCorner: {
    borderTopRightRadius: 87,

    overflow: 'hidden',
  },
  bottomSheetCont: {
    paddingTop: 40,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(11, 19, 25, 0.68)',
    height: 600,
  },
});
