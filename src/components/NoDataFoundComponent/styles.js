// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  noDataFoundText: {
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.normal,
    color: Colors.text.primary,
    alignSelf: 'center',
    ...AppStyles.mTop20,
  },
});
