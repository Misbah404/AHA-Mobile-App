// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.darkBlue,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 15,
    borderRadius: 20,
    flexDirection: 'row',
  },
  bankAccountIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  addNewBankText: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.bold,
    marginLeft: 15,
    top: 1,
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
