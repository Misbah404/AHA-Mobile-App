// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  addNewPaymentText: {
    color: Colors.text.primary,
    fontSize: 13,
    fontFamily: Fonts.type.bold,
  },
  addNewPaymentView: {
    ...AppStyles.flexRow,
    ...AppStyles.spaceBetween,
    ...AppStyles.alignItemsCenter,
    ...AppStyles.mTop10,
    paddingHorizontal: 5,
  },
  plusIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
