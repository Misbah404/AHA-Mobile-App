// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  yourBankAccountText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.large,
    color: Colors.text.primary,
    marginTop: 5,
  },
  childCont: {
    paddingHorizontal: 20,
  },
  hiddenItemMainView: {
    width: 100,
    borderRadius: 10,
    backgroundColor: Colors.background.darkRed,
    height: 80,
  },
  hiddenItemView: {
    alignItems: 'flex-end',
    right: '22%',
  },
  rowItemCont: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.border.primary,
    borderRadius: 10,
    padding: 12,
    backgroundColor: Colors.background.darkBlue,
    height: 80,
  },
  accountDetailsTextCont: {
    alignSelf: 'center',
    paddingHorizontal: 13,
  },
  bankName: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.small,
    color: Colors.text.primary,
  },
  accountTitle: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.xxSmall,
    color: Colors.text.primary,
    paddingTop: 10,
  },
  rightIcon: {
    height: 16,
    width: 10,
    resizeMode: 'contain',
    right: 20,
    alignSelf: 'center',
    position: 'absolute',
  },
});
