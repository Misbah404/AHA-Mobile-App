import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  textInputContainer: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.transparent,
    borderWidth: 1,
    padding: 3,
    borderBottomColor: Colors.grey1,
    borderBottomWidth: 1,
    fontFamily: Fonts.type.medium,
    color: Colors.grey5,
    fontSize: Fonts.size.small,
    width: '98%',
    height: 48,
    marginTop: 70,
  },
  _codeTextStyle: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.small,
    height: 20,
    color: Colors.white,
  },
  _textInputStyle: {
    color: Colors.white,
    height: 48,
  },
  _textContainerStyle: {
    backgroundColor: Colors.transparent,
  },
  _flagStyle: {
    width: 40,
    marginLeft: -5,
  },
  dropDownIcon: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
  },
});
