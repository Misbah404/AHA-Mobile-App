import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 20,
  },

  heading: {
    color: Colors.text.primary,
    fontSize: Fonts.size.large,
    fontFamily: Fonts.type.bold,
    marginTop: 5,
  },

  balanceMainView: {
    backgroundColor: Colors.background.darkBlue,
    borderRadius: 20,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },

  currentDate: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.Asap,
    color: Colors.text.gray,
  },

  balanceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  balance: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
    color: Colors.text.white,
  },

  currency: {
    fontSize: 28,
    fontFamily: Fonts.type.semiBold,
    color: Colors.text.white,
  },

  addMoreAmmountView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 5,
  },

  addMoreAmmountText: {
    color: Colors.text.white,
    fontFamily: Fonts.type.bold,
    fontSize: 13,
  },

  recentTransactionHeading: {
    fontSize: 16,
    fontFamily: Fonts.type.semiBold,
    color: Colors.text.white,
    marginTop: 25,
    paddingHorizontal: 5,
  },

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
    fontSize: 14,
  },

  date: {
    fontSize: 10,
    color: Colors.text.white,
  },

  amount: {
    fontSize: 12,
    color: Colors.text.white,
  },
  loaderViewSec: {
    alignSelf: 'center',
    flex: 1,
  },
  bankAccountIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    top: 2,
  },
  requestWithdrawlButton: {
    backgroundColor: Colors.background.purple,
    height: 42,
    width: '80%',
    alignSelf: 'center',
    marginVertical: 15,
  },
  requestWithdrawlButtonText: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.semiBold,
    color: Colors.text.white,
  },
  horizontalSeperator: {
    backgroundColor: Colors.background.secondary,
    borderStyle: 'dashed',
    borderWidth: 1,
    opacity: 0.2,
    marginVertical: 15,
  },
});
