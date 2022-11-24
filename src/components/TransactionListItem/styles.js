// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  recentTransactionMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  recentTransactionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginLeft: 20,
  },
  title: {
    color: Colors.text.white,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.semiBold,
  },
  date: {
    fontSize: Fonts.size.xxxSmall,
    color: Colors.text.white,
    paddingVertical: 3,
    fontFamily: Fonts.type.medium,
  },
  amount: {
    fontSize: Fonts.size.xxSmall,
    color: Colors.text.white,
    fontFamily: Fonts.type.medium,
  },
});
